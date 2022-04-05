// 1. 函数作为参数

function forEach(arr, fn) {
	for (let i = 0; i < arr.length; i++) {
		fn(arr[i])
	}
}

let arr = [1, 3, 2, 5, 9, 6]

forEach(arr, (item) => {
	console.log(item);
})

function filter(arr, fn) {
	const ret = []
	forEach(arr, (item) => {
		if (fn(item)) ret.push(item)
	})
	return ret
}

console.log(filter(arr, t => t % 2 == 0)) // 获取偶数


function map(arr, fn) {
	const result = []
	for (let item of arr) {
		result.push(fn(item))
	}
	return result
}

let arr3 = [1, 2, 3]
console.log(map(arr3, (item) => item * item))

function every(arr, fn) {
	let result = true
	for (let item of arr) {
		result = fn(item)
		if (!result) break
	}
	return result
}

let arr4 = [1, 2, 3, 8]
console.log(every(arr4, (item) => item < 4))


function some(arr, fn) {
	let result = false
	for (let item of arr) {
		result = fn(item)
		if (result) break
	}
	return result
}

let arr5 = [1, 2, 3, 8]
console.log(every(arr5, (item) => item < 4))