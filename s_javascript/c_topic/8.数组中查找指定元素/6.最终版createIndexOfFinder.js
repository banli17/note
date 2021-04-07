// 第四版
function createIndexOfFinder(dir, predicate, sortedIndex) {

    return function(array, item, idx){
        var length = array.length;
        var i = 0;

        if (typeof idx == "number") {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            }
            else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        }
        else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
            return array[idx] === item ? idx : -1;
        }

        // 判断是否是 NaN
        if (item !== item) {
            idx = predicate(array.slice(i, length), isNaN)
            return idx >= 0 ? idx + i: -1;
        }

        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) return idx;
        }
        return -1;
    }
}

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


var indexOf = createIndexOfFinder(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);
