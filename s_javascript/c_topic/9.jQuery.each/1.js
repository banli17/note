function isArrayLike2(o) {
    return o.hasOwnProperty('length') && o.hasOwnProperty(o.length - 1)
}

function isArrayLike(obj) {
    // obj 必须有 length属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    // 排除掉函数和 Window 对象
    if (typeRes === "function" || isWindow(obj)) {
        return false;
    }

    return typeRes === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}
function each(obj, callback) {
    let length, i = 0
    if (isArrayLike(obj)) {
        length = obj.length
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break
            }
        }
    } else {
        for (let key in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break
            }
        }
    }
    return obj
}