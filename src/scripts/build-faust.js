const fs = require("fs");
const path = require("path");

const dspsPath = path.join(__dirname, "../dsps");
const outputPath = path.join(__dirname, "../../dsps");
const dsps = fs.readdirSync(dspsPath);
const builtDsps = [];
(async () => {
    const { default: faust2wasmFiles } = await import("@shren/faustwasm/src/faust2wasmFiles.js");
    for (const dsp of dsps) {
        const inputFile = path.join(dspsPath, dsp);
        const name = dsp.split(".")[0];
        await faust2wasmFiles(inputFile, path.join(outputPath, name));
        builtDsps.push(name);
    }
    fs.writeFileSync(path.join(outputPath, "dsps.json"), JSON.stringify(builtDsps, null, 4));
    fs.writeFileSync(path.join(outputPath, "dsps.ts"), `${builtDsps.map(dsp => `\
import wasm_${dsp} from "./${dsp}/dspModule.wasm";
import json_${dsp} from "./${dsp}/dspMeta.json";\
`).join("\n")}

const map = {
${builtDsps.map(dsp => `\
    ${dsp}: {
        module: wasm_${dsp},
        json: json_${dsp}
    }\
`).join(",\n")}
};

export default map as unknown as Record<string, { module: string; json: string }>;
`);
})();
