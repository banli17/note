function createPerson(name) {
	console.log(name)
	this.key = 'key'
	return {
		getName: function(){
			return name
		}
	}
}

var person = createPerson('Jero');
console.log(key)