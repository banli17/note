/**
 * 1. 用来装饰类，相当于 decorator(Class)
 * 2. 可以给类添加属性、方法 target.x = x
 * 3. 可以给实例添加属性、方法 target.prototype.x = x
 */

@testable
@testable2(3)
class MyTestableClass {

}

function testable(target) {
    console.log(target) // 当前类本身
    target.isTestable = true
    target.prototype.hello = 'hello'
}

function testable2(a) {
    return function (target) {
        target.a = a
    }
}

console.log(MyTestableClass.isTestable)   // true
console.log(MyTestableClass.a)            // 3
console.log(new MyTestableClass().hello)  // 'hello'


/**
 * 将对象混合到某个类上
 */
function mixins(...list) {
    return function (target) {
        Object.assign(target, ...list)
    }
}

const Foo = {
    foo() {
        console.log('foo')
    }
}

const Bar = {
    bar() {
        console.log('bar')
    }
}

@mixins(Foo, Bar)
class MyClass {

}

MyClass.foo()  // 'foo'
MyClass.bar()  // 'bar'

















