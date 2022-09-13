export default function () {
  return {
    name: "my-example",
    // source, importer 都是路径字符串
    // /Users/banli/Desktop/course/course-fe-engineering/rollup/src/math.js /Users/banli/Desktop/course/course-fe-engineering/rollup/src/index.js { custom: { 'node-resolve': { isRequire: false } } }
    resolveId(source, importer, options) {
      console.log(source, importer, options);
      if (source === "virtual-module") {
        return source;
      }
      return null; // 返回 null 表示按照默认的正常处理, bail 钩子
    },
    load(id) {
      if (id === "virtual-module") {
        return `export default 'this is virtual module'`;
      }
      return null;
    },
  };
}
