const assert = require('assert')

/**
 * constructor
 * 1. 会在实例化时自动调用，如果不写，会默认添加一个空的 constructor
 * 2. new 返回值默认返回 this，如果在构造函数里返回基本类型，还是会返回 this，如果返回对象，则返回该对象
 * 3. 类必须使用 new 调用，否则报错
 */
class Foo {
    constructor(v) {
        if (v == 1) {
            return {name: 'zs'}
        }
    }
}

console.log(new Foo())  // Foo {}
console.log(new Foo(1))  // { name: 'zs' }
console.log(new Foo(1) instanceof Foo) // false
