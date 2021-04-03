import { deprecate } from 'core-decorators'

class Person {
    constructor() {
        this.name = 'zs'
    }
    // @autobind
    getPerson() {
        console.log(this)
        return this
    }

    @deprecate('xx')
    say() { }
}

let person = new Person()
let { getPerson } = person

getPerson()

person.name = 'lisi'
console.log(person.say())