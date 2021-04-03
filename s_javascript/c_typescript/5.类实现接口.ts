interface Animal {
    name: string,
    speak(words: string): void
}

class Dog implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    speak(words: string) {
        console.log(`${this.name} speak ${words}`)
    }
}

let d = new Dog('mm')
d.speak('hello')
