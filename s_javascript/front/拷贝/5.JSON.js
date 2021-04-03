let a = {
    name:'zs',
    age:12,
    child: undefined,
    say(){}
}

let b = JSON.parse(JSON.stringify(a))

console.log(b)   // { name: 'zs', age: 12 }