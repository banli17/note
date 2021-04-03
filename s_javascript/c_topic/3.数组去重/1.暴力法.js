function unique(arr) {
    const res = []
    let has = false  // res 中是否有相同元素
    for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
        for (let j = 0, resLen = res.length; j < resLen; j++) {
            // 已经有该item元素了，跳出循环，进行下一轮比较
            if (arr[i] === res[j]) {
                has = true
                break
            }
        }
        if (!has) {  // 还可以判断 j === resLen，因为循环完成，如果没有相同元素，j 刚好是 resLen
            res.push(arr[i])
        }
        has = false
    }
    return res
}


const arr = [1, 2, 3, 2, 3, '1', '2']
console.log(unique(arr))    // [ 1, 2, 3, '1', '2' ]
