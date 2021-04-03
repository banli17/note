function say(name) {

}

function log(fn) {
    return function () {
        console.log('start')
        const result = fn.apply(this, arguments)
        console.log('end')
        return result
    }
}

say = log(say)
say()