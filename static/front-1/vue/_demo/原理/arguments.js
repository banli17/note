function say(name, age) {
	console.log(name, age)
}

function wrapSay() {
	return say.apply(this, arguments)
}

wrapSay('zs', 12)