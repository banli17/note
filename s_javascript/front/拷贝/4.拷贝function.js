function a() {
    console.log('b')
}

let b = eval('(' + a.toString() + ')')
console.log(b)

a()

let d =Object.assign(a)
console.log(d ==a)

// let b = copy(a)

// console.log(a)