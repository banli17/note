class Monkey {
    public name: string
    private age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

class Person extends Monkey {
    constructor(name: string, age: number) {
        super(name, age)
        this.age = age
    }
    getAge() {
        return this.age
    }
}

let p = new Person('za', 12)

console.log(p.getAge())
