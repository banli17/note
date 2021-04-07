function createIndexFinder(dir) {
    return function (arr, predicate, context) {
        let index = dir > 0 ? 0 : arr.length
        for (; index >= 0 && index < arr.length; index += dir) {
            if (predicate.call(context, array[index], index, array)) return index;
        }
        return -1
    }
}

const findIndex = createIndexFinder(1)
const findLastIndex = createIndexFinder(-1)
