
const log = (target, name, descriptor) => {
    console.log(target, name, descriptor)

    console.log('调用了say方法')

    return {
        value: () => {
            console.log('hi')
        }
    }
}

class Person {
    @log
    say() {
        console.log('hello')
    }
}

const p = new Person()

p.say()