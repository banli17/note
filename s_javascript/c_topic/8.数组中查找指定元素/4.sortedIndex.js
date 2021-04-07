// 第二版
function cb(func, context) {
    if (context === void 0) return func;
    return function() {
        return func.apply(context, arguments);
    };
}

function sortedIndex(array, obj, iteratee, context) {

    iteratee = cb(iteratee, context)

    var low = 0, high = array.length;
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
        else high = mid;
    }
    return high;
};
