function calculator() {
	let value = 0
	console.time('h')
	for (let i = 0; i < 10000000000; i++) {
		value += i
	}
	console.timeEnd('h')
	return value
}


const c = calculator()

postMessage(c)

console.log('2 end')

