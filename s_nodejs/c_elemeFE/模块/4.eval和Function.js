// 对作用域的影响
const fn = new Function('a', 'b', `
c = 44;
    console.log('hi',a,b)
`)
;(function(){
    var y = 'hello'
    let fn1 = new Function('y', `console.log(y)`)  // 这个函数的作用域是全局的
    fn1()  // undefined
})();

// console.log(fn.toString())
// function anonymous(a,b
//     /*``*/) {
//         console.log('hi',a,b)
//     }

fn(3, 4)
console.log(c)  // 44  不var 可以定义在全局


eval(`d = 43`)
console.log(d)  //  不var 可以定义在全局
eval(`var e = 12`)
console.log(e)  // 全局变量
// eval(`(${str})`) // ()里的{}会被解释位代码块，而非字面量
var x = eval(`{name:12}`) // x是对象
