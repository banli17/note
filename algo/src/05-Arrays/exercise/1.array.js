let arr = [1, 2, 3]

arr = new Array(1, 2, 'hi') // [1, 2, 3]
console.log(arr);
arr = new Array([1, 2, 'hi'])  // [ [ 1, 2, 3 ] ]
console.log(arr);

arr = new Array(3)  // [ <3 empty items> ]
console.log(arr, arr.length);
console.log(arr.map(item => 2))
for (let i = 0; i < arr.length; i++) {
  arr[i] = 100
}
console.log(arr, arr.length);
arr = new Array(1)  // [ <1 empty item> ]
console.log(arr, arr.length);
