var s = '_x_x_';
var r1 = /x(_)/;
var r2 = /y/;

console.log(s.match(r1)) // [ 'x_', '_', index: 1, input: '_x_x_' ]
console.log(s.match(r2)) // null


var s1 = '_x_x_';
var r3 = /x(_)/g;
var r4 = /y/;

console.log(s.match(r3)) // [ 'x_', 'x_' ]
console.log(s.match(r4)) // null


var c = 'abba'
var reg = /a|b/
console.log(c.match(reg))