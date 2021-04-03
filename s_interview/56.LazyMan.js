class LazyManClass {
    constructor(name) {
        this.name = name
        console.log(`Hi I am ${name}`)
    }
    sleep(time) {
        let now = Date.now()
        while (Date.now() - time * 1000 < now) {}
        console.log(`等待了${time}秒...`)
        return this
    }
    eat(food) {
        console.log(`I am eating ${food}`)
        return this
    }
    sleepFirst(time){

    }
}

function LazyMan(name) {
    return new LazyManClass(name)
}
// LazyMan('Tony')
// LazyMan('Tony').sleep(10).eat('lunch')
// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner')


LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
