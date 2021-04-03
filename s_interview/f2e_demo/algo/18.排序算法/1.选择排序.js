function selectionSort(list) {
    let len = list.length
    let min
    for (let i = 0; i < len; i++) {
        // 寻找最小值
        min = i
        for (let j = i + 1; j < len; j++) {
            if (list[j] < list[min]) {
                min = j
            }
        }
        // 交换i min位置
        let temp = list[i]
        list[i] = list[min]
        list[min] = temp
    }
    return list
}

let l1 = [1, 5, 2, 3, 19, 8, 3]
console.log(selectionSort((l1)))
