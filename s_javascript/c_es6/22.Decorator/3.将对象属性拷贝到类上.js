const mixins = (...list) => (target) => {
    Object.assign(target.prototype, ...list)
}

const Foo = {
    foo() { console.log('foo') }
}

const Too = {
    too() { console.log('too') }
}

@mixins(Foo, Too)
class Test { }

let t = new Test()

console.log(t.foo)
console.log(t.too)