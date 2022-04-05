async function run() {
	console.log('green')
	await delay(10)
	console.log('yellow')
	await delay(2)
	console.log('red')
	await delay(5)
	requestAnimationFrame(run)
}

function delay(n) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, n * 1e3)
	})
}

run()