/**
 * 选择后续的元素往前面插入，插入到合适的位置
 */
function insertSort(list) {
    let len = list.length
    let temp
    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0; j--) {
            if (list[j] < list[j - 1]) {
                // 交换位置
                temp = list[j - 1]
                list[j - 1] = list[j]
                list[j] = temp
            }
        }
    }
    return list
}

let l1 = [1, 5, 2, 3, 19, 8, 3]
console.log(insertSort((l1)))
