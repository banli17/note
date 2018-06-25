const a = ['hello']


const b = a[Symbol.iterator]() // 和a.values()一样

console.log(b.next())