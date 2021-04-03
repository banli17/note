var a = {
    n: 1
};
var b = a;
a = a.x = {
    n: 2
};

console.log(a.x) // undefined
console.log(b.x) // {n:2}
console.log(a, b)
// 分析 a = b = {n:1}