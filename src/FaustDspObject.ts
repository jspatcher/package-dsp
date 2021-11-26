import { FaustAudioWorkletNode, FaustDspMeta, FaustMonoDspGenerator, LooseFaustDspFactory } from "@shren/faustwasm";
import { author, name, version, description } from "./index";
import { Bang, DefaultObject, DefaultUI } from "./sdk";
import type { IArgsMeta, IInletsMeta, IOutletsMeta } from "@jspatcher/jspatcher/src/core/objects/base/AbstractObject";

export interface FaustDspInternalState {
    dspFactory: LooseFaustDspFactory;
    faustDspGenerator: FaustMonoDspGenerator;
    dspId: string;
    merger: ChannelMergerNode;
    node: FaustAudioWorkletNode;
    splitter: ChannelSplitterNode;
    constant: ConstantSourceNode;
    constantConnected: number;
}

export default class FaustDspObject<
    S = {},
    I extends [Bang | any, ...any[]] = [Bang],
    O extends any[] = [],
    A extends any[] = any[],
    P = {}
> extends DefaultObject<{}, S, I, O, A, P> {
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
        description: "Initial value for the first unconnected inlet",
        default: 0
    }];
    static UI = DefaultUI;
    _: Partial<FaustDspInternalState> & Record<string, any> = {
        constant: this.audioCtx.createConstantSource()
    };
    get unconnected() {
        return this.inletLines.map(set => [...set].find(l => l.isConnectableByAudio)).findIndex(l => !l);
    }
    checkAndFillUnconnected() {
        const { unconnected } = this;
        const { constant, merger, constantConnected } = this._;
        if (!merger) return;
        if (unconnected !== constantConnected) {
            if (constantConnected !== -1) constant.disconnect();
            if (unconnected !== -1) constant.connect(merger, 0, unconnected);
            this._.constantConnected = unconnected;
        }
    }
    subscribe() {
        this.on("preInit", () => {
            const meta: FaustDspMeta = JSON.parse(this._.dspFactory.json);
            const { inputs, outputs } = meta;
            this.inlets = inputs;
            this.outlets = outputs;
            this.disconnectAudio();
            if (inputs) {
                const merger = this.audioCtx.createChannelMerger(inputs);
                this._.merger = merger;
                this.inletAudioConnections = new Array(inputs).fill(null).map((v, i) => ({ node: merger, index: i }));
            }
            const splitter = this.audioCtx.createChannelSplitter(outputs);
            this._.splitter = splitter;
            this.outletAudioConnections = new Array(outputs).fill(null).map((v, i) => ({ node: splitter, index: i }));
            this.connectAudio();
        });
        this.on("postInit", async () => {
            const { dspFactory, faustDspGenerator, dspId, constant, merger, splitter } = this._;
            const node = await faustDspGenerator.createNode(this.audioCtx, dspId, dspFactory);
            this._.node = node;
            merger?.connect(node);
            node.connect(splitter);
            constant.offset.value = +this.args[0] || 0;
            constant.start();
            this.checkAndFillUnconnected();
        });
        this.on("argsUpdated", ({ args }) => {
            this._.constant.offset.value = +args[0] || 0;
        })
        this.on("inlet", ({ inlet, data }) => {
            if (typeof data === "number") {
                this._.constant.offset.value = data;
            }
        });
        this.on("connectedInlet", () => this.checkAndFillUnconnected());
        this.on("disconnectedInlet", () => this.checkAndFillUnconnected());
        this.on("destroy", () => {
            const { constant, merger, splitter, node } = this._;
            constant?.disconnect();
            merger?.disconnect();
            splitter?.disconnect();
            node?.disconnect();
            node?.destroy();
        })
    }
}
