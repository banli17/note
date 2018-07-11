var a = [1, 2, '1'].map(parseInt)
console.log(a)

var c = parseInt('2', 2)
console.log(c)  // NaN ，因为2进制只有0和1


var d = ['1', '2', '3'].map(str => parseInt(str));
console.log(d);  // [1, 2, 3]


['1', '2', '3'].map(Number); // [1, 2, 3]