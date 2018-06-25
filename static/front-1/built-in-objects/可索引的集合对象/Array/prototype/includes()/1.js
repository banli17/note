[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
a = [1, 2, 3].includes(2, -1); // false
[1, 2, NaN].includes(NaN); // true

console.log(a)