const s = new Set([1, 2, 3, 4, 5, 5])

console.log(s)

console.log(s.size)
console.log(s.has(1))
console.log(s.delete(2))
console.dir(s[Symbol.iterator])

// 没有map方法
s.forEach(item => {
    console.log(item)
})