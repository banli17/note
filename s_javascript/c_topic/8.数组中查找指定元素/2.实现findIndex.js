function findIndex(arr, predicate, context) {
    for (let i = 0; i < arr.length; i++) {
        if (predicate.call(context, arr[i], i, arr)) {
            return i
        }
    }
    return -1
}

function isBigEnough(element) {
    return element >= 15;
}

let arr = [12, 5, 8, 130, 44]
let index = findIndex(arr, isBigEnough)

console.log(index)
