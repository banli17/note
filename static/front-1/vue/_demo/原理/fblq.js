const f = (index)=> {
	let res = [0, 1].includes(index) ? 1 : (f(--index) + f(--index))
	return res
}

// 1 1 2 3 5 8 13 21 34
console.time('hello')
var v = f(100)
console.timeEnd('hello')
