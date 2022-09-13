const POLYFILL_ID = "\0polyfill";
const PROXY_SUFFIX = "?inject-polyfill-proxy";

/**
 * 在入口文件，插入 import 'polyfill' 代码
 */
export default function (config) {
  // 插件配置参数
  console.log("config", config);

  return {
    name: "my-inject-polyfill",
    async resolveId(source, importer, options) {
      if (source === POLYFILL_ID) {
        return {
          id: POLYFILL_ID,
          moduleSideEffects: true, // 强制避免 polyfill 被 treeshaking
          // 不受外界使用 "treeshake.moduleSideEffects: false" 影响
        };
      }
      // console.log("options", options);
      if (options.isEntry) {
        // 获取真实的入口
        // resolve -> 会调用 resoleId
        const resolution = await this.resolve(source, importer, {
          skipSelf: true, // 避免死循环
          ...options,
        });
        // 如果不能被 resolved 或是 external，返回自身， rollup 会打印一个错误
        if (!resolution || resolution.external) return resolution;

        // 只在第一次 load 时添加，后面会用缓存
        // 不受外界使用 "treeshake.moduleSideEffects: false" 影响
        const moduleInfo = await this.load(resolution);
        moduleInfo.moduleSideEffects = true;

        // 代理入口文件, 增加 query，这里入口文件已经被修改了
        return `${resolution.id}${PROXY_SUFFIX}`;
      }
      return null;
    },
    load(id) {
      if (id === POLYFILL_ID) {
        return `console.log('polyfill');`;
      }

      console.log(id);
      if (id.endsWith(PROXY_SUFFIX)) {
        const entryId = id.slice(0, -PROXY_SUFFIX.length);

        // hasDefaultExport 是可以拿到的，因为上面入口已经被 load
        const { hasDefaultExport } = this.getModuleInfo(entryId);
        console.log("this.getModuleInfo(entryId)", this.getModuleInfo(entryId));
        let code = `
          import ${JSON.stringify(POLYFILL_ID)};
          export * from ${JSON.stringify(entryId)};
        `;
        if (hasDefaultExport) {
          code += `export {default} from ${JSON.stringify(entryId)}`;
        }
        return code;
      }
      return null;
    },
  };
}
