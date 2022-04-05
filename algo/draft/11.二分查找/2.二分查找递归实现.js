// 查找10 
let a = [1, 3, 9, 9, 10, 11, 22, 77]

function bSearch(x, arr) {
    return binarySearch(x, arr, 0, arr.length)
}

function binarySearch(x, arr, low, high) {
    let mid = Math.floor(low + (high - low) / 2)
    console.log(low, high);
    if (low >= high) {
        return -1
    }
    if (arr[mid] === x) {
        return mid
    } else if (arr[mid] > x) {
        return binarySearch(x, arr, low, mid - 1)
    } else {
        return binarySearch(x, arr, mid + 1, high)
    }
}

console.log(bSearch(9, a, 0, a.length))