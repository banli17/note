function unique(arr) {
    const res = []
    const len = arr.length
    for (let i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            // 后面有重复，就 +i，不管前面重复的，将最右边的插入
            // 2 2 -> 3 2 -> 3 3 -> 4...
            // 22相等，ij都往后走，33相等，再往后走
            if (arr[i] === arr[j]) {
                console.log('xx', arr[i], arr[j])
                j = ++i
            }
        }
        // console.log(i, j)
        res.push(arr[i])
    }
    console.log('res', res)
    return res
}

const arr = [1, 2, 3, '1', '2', 2, 2, 2, 3,]
unique(arr)
