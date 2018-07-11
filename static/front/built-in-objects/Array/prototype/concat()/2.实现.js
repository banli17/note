function concat() {
	const len = arguments.length
	const newArr = []
	for (let i = 0; i < len; i++) {
		if (Array.isArray(arguments[i])) {
			let arrlen = arguments[i].length
			for (let j = 0; j < arrlen; j++) {
				newArr.push(arguments[i][j])
			}
		} else {
			newArr.push(arguments[i])
		}
	}
	return newArr
}

const a = {name: 'zs', child: {age: 12}}
const c = concat([1], 'hello', a)
console.log(c, c[2] == a)