var a = ['a', 'b', 'c']


a.forEach(function (item) {
	console.log(item)
	if (item == 'a') {
		a.pop()
	}
})



var words = ["one", "two", "three", "four"];
words.forEach(function(word) {
	console.log(word);
	if (word === "two") {
		words.shift();
	}
});