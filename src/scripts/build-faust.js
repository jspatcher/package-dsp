const fs = require("fs");
const path = require("path");
const { default: faust2wasmFiles } = require("@shren/faustwasm/src/faust2wasmFiles.js");

const dspsPath = path.join(__dirname, "../dsps");
const outputPath = path.join(__dirname, "../../dsps");
const dsps = fs.readdirSync(dspsPath);
const builtDsps = [];
(async () => {
    for (const dsp of dsps) {
        const inputFile = path.join(dspsPath, dsp);
        const name = dsp.split(".")[0];
        await faust2wasmFiles(inputFile, path.join(outputPath, name));
        builtDsps.push(name);
    }
    fs.writeFileSync(path.join(outputPath, "dsps.json"), JSON.stringify(builtDsps, null, 4))
})();
