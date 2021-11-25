import { FaustMonoDspGenerator } from "@shren/faustwasm";
import getDsps from "./getDsps";
import FaustDspObject, { FaustDspInternalState } from "./FaustDspObject";

export default async () => {
    const objects: Record<string, typeof FaustDspObject> = {};
    const dspIdMap: Record<string, string> = {
        add: "+~",
        sub: "-~",
        mul: "*~",
        div: "/~"
    };
    const dsps = await getDsps();
    const faustDspGenerator = new FaustMonoDspGenerator();
    for (const dspId in dsps) {
        const dspFactory = dsps[dspId];
        objects[dspIdMap[dspId]] = class extends FaustDspObject<any, any, any, any, any> {
            _: FaustDspInternalState = {
                ...this._,
                dspFactory,
                dspId,
                faustDspGenerator
            }
        }
    }
    return objects;
};
