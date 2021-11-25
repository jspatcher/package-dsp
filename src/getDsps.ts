import type { LooseFaustDspFactory } from "@shren/faustwasm";

export default async () => {
    const dsps: Record<string, LooseFaustDspFactory> = {};
    const listIn = await import("../dsps/dsps.json") as any;
    const list = JSON.parse(listIn.default);
    for (const dspId of list) {
        const moduleUri = (await import(`../dsps/${dspId}/dspModule.wasm`)).default as string;
        const moduleRes = await fetch(moduleUri);
        const module = await WebAssembly.compileStreaming(moduleRes);
        const json = (await import(`../dsps/${dspId}/dspMeta.json`)).default;
        dsps[dspId] = {
            module,
            json
        }
    }
    return dsps;
};
