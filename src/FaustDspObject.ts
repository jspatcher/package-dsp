import type { FaustAudioWorkletNode, FaustDspMeta, FaustMonoDspGenerator, LooseFaustDspFactory } from "@shren/faustwasm";
import { author, name, version, description } from "./index";
import { Bang, DefaultObject, DefaultUI } from "./sdk";
import type { IArgsMeta, IInletsMeta, IOutletsMeta, IPropsMeta } from "@jspatcher/jspatcher/src/core/objects/base/AbstractObject";

export interface FaustDspInternalState {
    dspFactory: LooseFaustDspFactory;
    faustDspGenerator: FaustMonoDspGenerator;
    dspId: string;
    merger: ChannelMergerNode;
    node: FaustAudioWorkletNode;
    splitter: ChannelSplitterNode;
    defaultInputs: [];
    constants: ConstantSourceNode[];
    constantsConnected: boolean[];
    argsOffset: number;
}

interface Props {
    smoothInput: number;
}

export default class FaustDspObject<
    S = {},
    I extends [Bang | any, ...any[]] = [Bang],
    O extends any[] = [],
    A extends any[] = any[],
    P = Partial<Props> & Record<string, any>
> extends DefaultObject<{}, S, I, O, A, P & Props> {
    static package = name;
    static author = author;
    static version = version;
    static description = description;
    static inlets: IInletsMeta = [{
        isHot: true,
        type: "signal",
        description: "audio input connection",
        varLength: true
    }];
    static outlets: IOutletsMeta = [{
        type: "signal",
        description: "audio output connection",
        varLength: true
    }];
    static args: IArgsMeta = [{
        type: "number",
        optional: true,
        varLength: true,
        description: "Initial inputs",
        default: 0
    }];
    static props: IPropsMeta<Props> = {
        smoothInput: {
            type: "number",
            description: "Linear interpolate to input values within a duration in seconds",
            default: 0,
        }
    };
    static UI = DefaultUI;
    _: Partial<FaustDspInternalState> = {
        defaultInputs: [],
        constants: [],
        constantsConnected: [],
        argsOffset: 0
    };
    get audioConnections() {
        return this.inletLines.map(set => [...set].find(l => !l.disabled && l.isConnectableByAudio)).map(l => !!l);
    }
    checkAndFillUnconnected() {
        const { audioConnections } = this;
        const { constants, constantsConnected } = this._;
        if (!this.inlets) return;
        for (let i = 0; i < this.inlets; i++) {
            if (audioConnections[i] === constantsConnected[i]) continue;
            const constant = constants[i];
            if (audioConnections[i]) {
                constant.offset.value = 0;
            } else if (!audioConnections[i] && !constantsConnected[i]) {
                constant.offset.value = this._.defaultInputs[i] || 0;
            }
            constantsConnected[i] = audioConnections[i];
        }
    }
    subscribe() {
        super.subscribe();
        this.on("preInit", () => {
            const meta: FaustDspMeta = JSON.parse(this._.dspFactory.json);
            const { inputs, outputs } = meta;
            if (inputs) {
                const merger = this.audioCtx.createChannelMerger(inputs);
                this._.merger = merger;
                for (let i = 0; i < inputs; i++) {
                    const constant = this.audioCtx.createConstantSource();
                    this._.constants[i] = constant;
                    constant.connect(merger, 0, i);
                    this._.constantsConnected[i] = false;
                }
            }
            const splitter = this.audioCtx.createChannelSplitter(outputs);
            this._.splitter = splitter;

            this.inlets = inputs;
            this.outlets = outputs;
            this.disconnectAudio();
            this.inletAudioConnections = this._.constants.map((node) => ({ node: node.offset, index: 0 }));
            this.outletAudioConnections = new Array(outputs).fill(null).map((v, i) => ({ node: splitter, index: i }));
            this.connectAudio();
        });
        this.on("postInit", async () => {
            const { dspFactory, faustDspGenerator, dspId, constants, merger, splitter, argsOffset } = this._;
            const node = await faustDspGenerator.createNode(this.audioCtx, dspId, dspFactory);
            this._.node = node;
            this.checkAndFillUnconnected();
            merger?.connect(node);
            node.connect(splitter);
            constants.forEach((constant, i) => {
                if (!this._.constantsConnected[i]) constant.offset.value = +this.args[i - argsOffset] || (this._.defaultInputs[i] ?? 0);
                constant.start();
            });
        });
        this.on("argsUpdated", () => {
            this._.constants.forEach((constant, i) => {
                if (!this._.constantsConnected[i]) constant.offset.value = +this.args[i - this._.argsOffset] || (this._.defaultInputs[i] ?? 0);
            });
        })
        this.on("inlet", ({ inlet, data }) => {
            if (typeof data === "number") {
                if (this._.constants[inlet] && !this._.constantsConnected[inlet]) {
                    const constant = this._.constants[inlet];
                    constant.offset.value = constant.offset.value;
                    constant.offset.linearRampToValueAtTime(data, this.audioCtx.currentTime + this.getProp("smoothInput"));
                }
            }
        });
        this.on("connectedInlet", () => this.checkAndFillUnconnected());
        this.on("disconnectedInlet", () => this.checkAndFillUnconnected());
        this.on("destroy", () => {
            const { constants, merger, splitter, node } = this._;
            constants.forEach(constant => constant?.disconnect());
            merger?.disconnect();
            splitter?.disconnect();
            node?.disconnect();
            node?.destroy();
        })
    }
}
