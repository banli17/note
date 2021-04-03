// const rquickExpr = /^(a|b)$/

// console.log(rquickExpr.test('a')) true
// console.log(rquickExpr.test('abbb')) false


// const rquickExpr1 = /^?:\s*(<[\w\W]+>)[^>]*$/
// const rquickExpr2 = /^#([\w-]*)$/


// 分析 /^(?:\s*(<[\w\W]+>)[^>]*)$/
// ?: 匹配不捕获
// \s* 匹配空格，制表符，换页符等 0次或多次 \s{0,}
// [\w\W] 匹配任何字符， \w 表示 [0-9a-zA-Z_]
// (<[\w\W]+>)   <p> <div>
// [^>]* 匹配非>， 等价于{0, }


// #([\w-]*)  匹配 # [0-9a-zA-Z-]

// 如果是标签，则得到标签，如果是#xx 则得到 id
const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/

let str = ' <div id=top></div> aa<div><div>'
console.log(rquickExpr.exec(str))

let str1 = '#-'
console.log(rquickExpr.exec(str1))

