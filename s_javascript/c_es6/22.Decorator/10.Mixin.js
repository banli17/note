
// mixin(superclass)返回一个继承自superclass的子类
const mixin = (superclass) => class extends superclass {
    walk() {
        console.log('walk from mixin')
    }
}

class Monkey { }

// mixin(Monkey)
class Person extends mixin(Monkey) { }

const p = new Person
console.log(p.walk)