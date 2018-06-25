module.exports = (...args)=> {
	return args.reduce((a, b)=> {
		return a * b
	})
}