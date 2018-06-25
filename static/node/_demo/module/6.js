setImmediate(()=> {
	console.log('setImmediate')
})

setTimeout(()=> {
	console.log('setTimeout')
}, 6)

process.nextTick(()=> {
	console.log('nextTick')
})
