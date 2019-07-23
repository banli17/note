let obj = {}

// Object.defineProperty called on non-object
// Object.defineProperty(null, 'a', {
// 	value: 22
// })

// Object.defineProperty called on non-object
// Reflect.defineProperty(null, 'a', {
// 	value: 22
// })

let obj1 = Object.defineProperty(obj, 'name', {
	value: 'zs',
	enumerable: true
})

console.log(obj, obj1)

let res = Reflect.defineProperty(obj, 'name', {
	value: 'lucy'
})
console.log(res, obj)  // false  {name: 'zs'}

let res1 = Reflect.defineProperty(obj, 'age', {
	value: 12
})
console.log(res1, obj.age)  // true  12