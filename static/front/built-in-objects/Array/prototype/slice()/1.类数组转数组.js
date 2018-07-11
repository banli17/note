function list() {
	return Array.prototype.slice.call(arguments)
}

console.log(list(1, 3, 5))  // [ 1, 3, 5 ]