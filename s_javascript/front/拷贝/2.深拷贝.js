function type(v) {
    let a = Object.prototype.toString.call(v)
    return a.substring(8, a.length - 1)
}

function copyArray(a) {
    let b = []
    a.forEach(item => {
        if (type(item) === 'Object') {
            b.push(copy(item))
        } else if (type(item) === 'Array') {
            copyArray(item)
        } else {
            b.push(item)
        }
    })
    return b
}

function copy(source) {
    let target = {}
    for (let i in source) {
        if (type(source[i]) === 'Object') {
            copy(source[i])
        } else if (type(source[i]) === 'Array') {
            target[i] = copyArray(source[i])
        } else {
            target[i] = source[i]
        }
    }
    return target
}


let a = {name: 'zs', age: 3, child: [{name: 'xx', age: 44}]}

let b = copy(a)

console.log(b)
console.log(b.child === a.child)  // true


console.log(copyArray([1, 23, 3, {name: 'zs'}]))





