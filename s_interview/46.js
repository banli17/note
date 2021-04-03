var obj = {
    // '2': 3,
    // '3': 4,
    // 'length': 2,
    // 'splice': Array.prototype.splice,
    // 'push': Array.prototype.push
}
// obj.push(1)
// obj.push(2)
// console.log(obj)

Array.prototype.push.call(obj, 3, 6)

console.log(obj)


// v8 push 的原理是 arr[i+ length] = arg 根据 length 循环设置值，更新length