/**
 * 方法的装饰
 * 1. 是给原型方法上添加装饰器，三个参数分别为：(target : Person.prototype, name: 属性名, descriptor: 属性的描述对象)
 * 2. 装饰器是编译阶段完成的，
 */
class Person {
    constructor(firstname) {
        this.firstname = firstname
    }

    @readonly
    name() {
        return this.firstname
    }
}

//  参数分别为
function readonly(target, name, descriptor) {
    console.log(Person) // undefined
    console.log(target, name, descriptor)
    descriptor.writable = false  // 不可修改
    descriptor.enumerable = false  // 不可枚举
    return descriptor
}

let p1 = new Person()
p1.name()
Person.prototype.name = () => {
}
console.log(p1.name)  // 不会报错，但是修改不了ƒ name() { return this.firstname; }
console.log(Object.keys(p1))  // ["firstname"]

// 日志的例子
function log(target, name, descriptor) {
    console.log('xxx')
    // const oldValue = descriptor.value
    console.log(descriptor)
    // descriptor.value = function () {
    //     console.log(`调用了 ${name} 方法,参数是:`, arguments)
    //     oldValue.apply(this, arguments)
    // }
}

class SubMath {
    @log
    a;

    // @log
    add(a, b) {
        return a + b
    }
}

const math = new SubMath()
math.add(3, 4)
math.a = 3;
console.log(math.a)
