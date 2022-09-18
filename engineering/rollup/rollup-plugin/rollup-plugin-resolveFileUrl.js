export default function () {
  return {
    name: "resole-file-url",
    resolveId(filename) {
      if (filename === "virtual-module") {
        return "virtual-module";
      }
    },
    load(id) {
      if (id === "virtual-module") {
        const referenceId = this.emitFile({
          type: "asset",
          source: `export default "virtual-module"`,
          fileName: "virtual-module.js",
        });

        // http://127.0.0.1:5500/dist/virtual-module.js
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId}`;

        // return `export * from "import.meta.ROLLUP_FILE_URL_${referenceId}"`
        //         1: import vm from "virtual-module";
        //           ^
        // 2: import math from "./math";
        // Error: 'default' is not exported by virtual-module, imported by src/index.js

        // return `export default 'virtual-module'`
      }
    },
    resolveFileUrl(url) {
      console.log('gg',url);
      // return `hello`
    },
  };
}
