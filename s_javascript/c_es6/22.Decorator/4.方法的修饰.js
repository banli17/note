const readonly = (target, name, descriptor) => {
    descriptor.writable = false
    //console.log(descriptor)
    // - configurable: true
    // - enumerable: false
    // - value: ƒ getAge()
    // - writable: false

    return { value: () => { return 19 } }
    return descriptor
}

class Person {
    @readonly
    getAge() {
        return '12'
    }
}

let p = new Person();
console.log(p.getAge())

p.getAge = () => {

}

console.log(p.getAge) // Uncaught TypeError: Cannot assign to read only property 'getAge' of object '#<Person>'