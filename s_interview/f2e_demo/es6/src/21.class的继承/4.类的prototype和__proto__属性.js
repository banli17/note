const assert = require('assert');

/**
 * es5:
 * instance.__proto__  == class.prototype
 * EB 作为类来说，它的原型是 EA
 **/
function EA(...args) {

}

function EB(...args) {
    EA.apply(this, ...args)
}

EB.prototype = new EA();
EB.prototype.constructor = EB;

/** es6:
 * subClass.__proto__ == parentClass  // 类的继承，继承静态属性和变量
 * subClass.prototype.__proto__ = parentClass.prototype  // 实例的继承
 *
 * 即：
 * Object.setPrototype(B.prototype, A.prototype)
 * Object.setPrototype(B, A)
 * 这意味着只有父类是一个有 prototype 的函数，它就能被继承，Function.prototype 没有 prototype 属性
 *
 */
class A {

}

class B extends A {

}

assert(B.__proto__ === A)
assert(B.prototype.__proto__ === A.prototype)

// setPrototype 的实现
Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj
}

console.log(Function.prototype)

class F extends Function {

}

console.log(new F())

/**
 * 如果不继承，默认继承 Function.prototype
 **/
class X {

}

assert(X.__proto__ === Function.prototype)
assert(X.prototype.__proto__ === Object.prototype)
let fn = new Function();
console.log(fn.__proto__ == Function.prototype)
console.log(fn)

// 子类实例的 __proto__.__proto__ = 父类实例的 __proto__
