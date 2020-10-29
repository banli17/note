const assert = require('assert');

// Mixin: 多个对象合成一个新的对象，新对象具有各个成员的接口

// 1、简单实现
const a = {a: 1}
const b = {b: 2}
const c = {...a, ...b}
console.log(c)

// 2、完备实现: 将多个类的接口混入mix in另一个接口
function mix(...mixins) {
    class Mix {
        constructor() {
            // 拷贝实例属性
            for (let mixin of mixins) {
                copyProperties(this, new mixin())
            }
        }
    }

    for (let mixin of mixins) {
        // 拷贝静态属性
        copyProperties(Mix, mixin)
        // 拷贝原型属性
        copyProperties(Mix.prototype, mixin.prototype)
    }
    return Mix
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

class A {
    sayA() {
        console.log('this is A')
    }
}

class B {
    sayB() {
    }
}

class CP {
    sayCP() {

    }
}

class C extends CP {
    sayC() {
        console.log('this is C')
    }
}

let M = mix(A, B, C)
let m = new M()
console.log(Object.keys(m))
console.log(m.sayA)

// 多继承
class Z extends mix(A, B, C) {

}

let z = new Z()
z.sayA();
z.sayC();
z.sayCP();
