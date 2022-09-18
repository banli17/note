export default function () {
  return {
    name: "dynamic-import-plugin",
    renderDynamicImport(a) {
      // console.log('renderDynamicImport', a)
      return {
        left: "dynamicImportPolyfill(",
        right: ", import.meta.url)",
      };
    },
  };
}
