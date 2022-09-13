export default function () {
  return {
    watchChange(){
      console.log('watchChange')
    },
    // 将命令行参数和文件配置合并
    options(options) {
      console.log("options");
    },
    buildStart(a) {
      console.log("buildStart");
    },
    // resoleId /Users/banli/Desktop/course/course-fe-engineering/rollup/src/index.js
    // resoleId /Users/banli/Desktop/course/course-fe-engineering/rollup/src/index.js
    // resoleId /Users/banli/Desktop/course/course-fe-engineering/rollup/src/math.js
    // resoleId /Users/banli/Desktop/course/course-fe-engineering/rollup/src/math.js
    resolveId(id) {
      console.log("resoleId", id);
    },
    load(load) {
      console.log("load", load);
    },
    shouldTransformCachedModule() {
      console.log("shouldTransformCachedModule");
    },
    moduleParsed(module) {
      console.log("moduleParsed", module);
    },
    transform() {
      console.log("transform");
    },
  };
}
