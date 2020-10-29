// es6之前 原生构造函数无法继承，因为 this 传递给原生构造函数会失效
// 原生构造函数 this 无法绑定，拿不到内部属性
//比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常
function MyArray() {
    Array.apply(this, arguments)
}

MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
})

var colors = new MyArray();
colors.push('hello')
console.log(colors)
colors[2] = 'hi'
console.log(colors) // { '0': 'hello', '2': 'hi', length: 1 }


var e = {};

console.log(Object.getOwnPropertyNames(Error.call(e)) )
// [ 'stack' ]

console.log(Object.getOwnPropertyNames(e))
// []

// es6 可以继承原生对象，因为它是先生成父类的实例，再加工
class MyEs6Array extends Array{
    constructor(...args){
        super(...args)
    }
}
var arr = new MyEs6Array()
arr[0] = 1
console.log(arr.length)

// 注意Object 不同，通过 super() 或其它非 new Object() 方式调用，传给Object 的参数会忽略
class NewObj extends Object{
    constructor(){
        super(...arguments);
    }
}
var o = new NewObj({attr: true});
o.attr === true  // false
console.log(o.attr)  // undefined

Object()
