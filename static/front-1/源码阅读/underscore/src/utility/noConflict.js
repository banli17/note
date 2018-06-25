const root = this
const cache_ = root._

_ = {name: 'aa'}

function noConflict() {
	root._ = cache_
	return _
}

noConflict()
console.log(_)
	
