import MagicString, { Bundle } from "magic-string";

const code = `export var name = 'hello'`;
const ms = new MagicString(code);

console.log(ms);

// s.snip( start, end ) 返回克隆的字符串
console.log(ms.snip(0, 6).toString()); // export

//删除0, 7之间的内容
console.log(ms.remove(0, 7).toString()); // sourceCode.slice(7);
// var name = 'hello'

// 合并代码
let bundle = new Bundle();
bundle.addSource({
  content: "var a = 1;",
  separator: "\n",
});
bundle.addSource({
  content: "var b = 2;",
  separator: "\n",
});
console.log(bundle.toString());
// var a = 1;
// var b = 2;
