function joinArgs() {
	return Array.prototype.join.call(arguments, '')
}

console.log(joinArgs(1, 2, 3))  // 123
