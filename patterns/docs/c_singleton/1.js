class Singleton {
    constructor() {

    }

    static getInstance() {
        if (!this.singleton) {
            this.singleton = new Singleton()
        }
        return this.singleton
    }
}

// console.log(new Singleton())
console.log(Singleton.getInstance() == Singleton.getInstance())
