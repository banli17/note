const Bundle = require("./bundle");

/**
 * rollup 生成一个 bundle
 * bundle 有 generate write 方法
 */
function rollup(entry, filename) {
  console.log("rollup start");
  const bundle = new Bundle({ entry });
  bundle.build(filename);
  return bundle
}

module.exports = rollup;
