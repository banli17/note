function type(v) {
    let a = Object.prototype.toString.call(v)
    return a.substring(8, a.length - 1)
}

function copy(source) {
    let target = {}
    for (let i in source) {
        target[i] = source[i]
    }
    return target
}


let a = {name: 'zs', age: 3, child: []}

let b = copy(a)

console.log(type(b))
console.log(b.child === a.child)  // true
