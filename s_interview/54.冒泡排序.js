function randomArr(size) {
    return new Array(size).fill(null).map(() => {
        return Math.floor(Math.random() * 100 + 1)
    })
}

let arr = randomArr(10)

console.log(arr)

function bubbleSort(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1, arr)
            }
        }
    }
    return arr
}

function swap(m, n, arr) {
    let temp = arr[m]
    arr[m] = arr[n]
    arr[n] = temp
}
console.log(bubbleSort(arr))