function start(s) {
	if (s === 'a') {
		return foundA
	} else {
		return start
	}
}

function foundA(s) {
	if (s === 'b') {
		return foundB
	} else {
		// 直接处理 s, 代理一下
		return start(s)
	}
}

function foundB(s) {
	if (s === 'x') {
		return end
	} else {
		return start(s)
	}
}

function end() {
	return end
}

function match(str) {
	let state = start
	for (let s of str) {
		console.log(state)

		state = state(s)
	}
	return state === end
}

// 寻找 abx
const str = 'abababx'
console.log(match(str))