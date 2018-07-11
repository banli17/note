var a = ['a', 'b']
var b = ['c', 'd']

var c = Array.prototype.push.apply(a, b)
console.log(a, c)  // [ 'a', 'b', 'c', 'd' ] 4
