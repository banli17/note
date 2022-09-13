const REG = /<tpl>([\s\S]+?)<\/tpl>/
// 只有一个参数 source
module.exports = function (source) {
  // console.log(args);
  const _source = source.match(REG)
  console.log(_source);
  return _source ? _source[1] : _source // '\n  export default {\n    a: 1,\n    b: 2,\n  }\n' 会被 eval
}

if (require.main === module) {
  // console.log(module);
  console.log('node tpl-loader.js 被当作入口执行, 这里可以调试代码 !!! ')
}
