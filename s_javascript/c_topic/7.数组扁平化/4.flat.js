var arr1 = [1, [2, [3, 4]], [5, '6'], null, {}];

console.log(arr1.flat(Infinity))
//[ 1, 2,   3,    4, 5, '6', null, {} ]
