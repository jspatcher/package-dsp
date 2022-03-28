import { FaustDspMeta, FaustMonoDspGenerator } from "@shren/faustwasm";
import getDsps from "./getDsps";
import FaustDspObject, { FaustDspInternalState } from "./FaustDspObject";
import { description } from "./index";
import { IArgMeta, IInletMeta } from "@jspatcher/jspatcher/src/core/objects/base/AbstractObject";

export default async () => {
    const objects: Record<string, typeof FaustDspObject> = {};
    const dspIdMap: Record<string, string> = {
        add: "+",
        sub: "-",
        rsub: "!-",
        mul: "*",
        div: "/",
        rdiv: "!/",
        gtr: ">",
        geq: ">=",
        lss: "<",
        leq: "<=",
        eq: "=",
        neq: "!=",
        mod: "%",
        bitand: "&",
        bitor: "|",
        max: "maximum",
        min: "minimum",
    };
    const dsps = await getDsps();
    const faustDspGenerator = new FaustMonoDspGenerator();
    for (const dspId in dsps) {
        const dspFactory = dsps[dspId];
        const meta: FaustDspMeta = JSON.parse(dspFactory.json);
        const { meta: declaredMeta } = meta;
        const descr = declaredMeta.find(m => "description" in m)?.description || description;
        const defaultInputsStr = declaredMeta.find(m => "defaultInputs" in m)?.defaultInputs;
        const defaultInputs = defaultInputsStr ? JSON.parse(defaultInputsStr) : [];
        const argsOffset = +declaredMeta.find(m => "argsOffset" in m)?.argsOffset || 0;
        const inputsDescr = declaredMeta.find(m => "inputsDescription" in m)?.inputsDescription;
        const inputsDescrArr = inputsDescr ? JSON.parse(inputsDescr.replace(/`/g, '"')) as string[] : null;
        objects[`${dspIdMap[dspId] || dspId}~`] = class extends FaustDspObject<any, any, any, any, any> {
            static description = descr;
            static inlets = (inputsDescrArr || [null]).map((d) => ({
                isHot: true,
                type: "signal",
                description: d || "audio input connection",
                varLength: true
            } as IInletMeta));
            static args = inputsDescrArr?.slice(argsOffset).map((d, i) => ({
                type: "number",
                optional: true,
                varLength: true,
                description: d || `arg${i}`,
                default: defaultInputs[i + argsOffset] || 0
            }) as IArgMeta) || [{
                type: "number",
                optional: true,
                varLength: true,
                description: "Initial inputs",
                default: 0
            } as IArgMeta];
            _: FaustDspInternalState = {
                ...this._,
                dspFactory,
                dspId,
                faustDspGenerator,
                defaultInputs,
                argsOffset
            }
        }
    }
    return objects;
};
