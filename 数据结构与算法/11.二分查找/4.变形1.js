// 查找第一个 9 
let a = [1, 3, 9, 9, 9, 10, 11, 22, 77]

// 1. 维护3个索引：low mid high
function binarySearch(x, arr) {
    let low = 0
    let high = arr.length - 1
    let mid

    while (low <= high) {
        mid = Math.floor(low + (high - low) / 2)
        if (x < arr[mid]) {
            high = mid - 1
        } else if (x > arr[mid]) {
            low = mid + 1
        } else {
            if (mid == 0 || arr[mid - 1] != x) {
                return mid
            } else {
                high = mid - 1
            }
        }
    }

    return -1
}

console.log(binarySearch(9, a))