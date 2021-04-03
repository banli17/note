function mNew(contor, ...args) {
    let o = Object.create(null)
    let r = contor.call(o, ...args)
    Object.setPrototypeOf(o, contor.prototype)
    return r instanceof Object ? r : o
}

function Person(name, age) {
    this.name = name
    this.age = age
    // return {}
}
Person.prototype.say = function () {

}

const p = new Person('zs', 22)

console.log(p, p.say)