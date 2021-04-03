let _ = require('underscore')

function allkeys(obj) {
    if (!obj) return []
    if (obj instanceof Array) {
        return obj
    }
    return Object.keys(obj)
}

function extend(obj) {
    if (typeof obj !== 'object') return obj
    let len = arguments.length
    for (let index = 1; index < len; index++) {
        const keys = allkeys(arguments[index])
        const source = arguments[index]
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            obj[key] = source[key]
        }
    }
    return obj
}

let a = {name: 'zs', age: 3, a: undefined, child: [{name: 'xx', age: 1}]}
let b = {name: 'yy', age: 22, a: null, child: 44, c: undefined}

let c = _.extend({}, a, b, null, true)

let d = _.defaults(a)
a.name = 'gg'
console.log(d.name)


// let d = _.extend(a)
// a.name = 'x'
// console.log(d.name)


// console.log(b.child == a.child)