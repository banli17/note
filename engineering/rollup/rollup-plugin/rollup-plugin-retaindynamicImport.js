export default function retainImportExpressionPlugin() {
  return {
    name: 'retain-import-expression',
    resolveDynamicImport(specifier) {
      if (specifier === 'esm-lib') return false;
      return null;
    },
    renderDynamicImport({ targetModuleId }) {
      if (targetModuleId === 'esm-lib') {
        return {
          left: 'import(',
          right: ')'
        };
      }
    }
  };
}
