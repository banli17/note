/**
 * 循环，每次交换两个元素的位置
 * 优化：
 * 1. 如果已经有序，就无需再循环
 * 2. 如果后面部分已经有序，则无需后续，可以做一个索引，记录最后有序的索引
 */
function bubbleSort(list) {
    let len = list.length
    let lastExchangeIndex = 0
    let sortBorder = len - 1
    let temp
    for (let i = 0; i < len - 1; i++) {
        let isSorted = true
        // 优化：每次最后一个元素都排好了，所以用 len-i-1
        console.log(sortBorder)
        for (let j = 0; j < sortBorder; j++) {
            if (list[j] > list[j + 1]) {
                temp = list[j]
                list [j] = list[j + 1]
                list[j + 1] = temp
                isSorted = false
                lastExchangeIndex = j
            }
        }
        sortBorder = lastExchangeIndex
        if (isSorted) {
            break
        }
    }
    return list
}

let l1 = [1, 5, 2, 3, 19, 8, 3, 20, 22, 25, 28]
console.log(bubbleSort((l1)))
