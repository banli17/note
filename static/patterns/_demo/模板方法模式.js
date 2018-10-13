class Drink {
    constructor() {
        this.bwater()
        this.mix()
        this.change()
        if (this.isadd()) {
            this.add()
        }
    }

    bwater() {
        console.log('煮开水')
    }

    mix() {

    }

    change() {

    }

    add() {

    }

    isadd() {

    }
}

class Tea extends Drink {
    mix() {
        console.log('mix tea')
    }

    change() {
        console.log('tea to box')
    }

    add() {
        console.log('add 1')
    }

    isadd() {
        return false
    }
}

const t = new Tea()
