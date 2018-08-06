class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
        this.notifyAllObserver()
    }

    notifyAllObserver() {
        this.observers.forEach(observe => {
            observe.update()
        })
    }

    attach(observer) {
        this.observers.push(observer)
    }

}

class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }

    update() {
        console.log(`my name is ${this.name},subject state is ${this.subject.getState()}`)
    }
}

const s = new Subject()
const o1 = new Observer('o1', s)
const o2 = new Observer('o2', s)

s.setState(1)
s.setState(2)

