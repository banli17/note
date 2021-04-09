
let toString = Object.prototype.toString
function isFunction(o) {
    return toString.call(o) === '[object Function]'
}
function eq(a, b, aStack, bStack) {
    // 判断基本类型
    // 以及 +0 -0 返回 false，如果是0 0  -0-0，返回true
    if (a === b) return a !== 0 || 1 / a === 1 / b

    // undefined 或 null
    if (a == null || b == null) return false

    // NaN
    if (a !== a) return b !== b

    // 如果是基本类型，直接返回 false
    const typea = typeof a
    const typeb = typeof b
    if (typea !== 'function' && typea !== 'object' && typeb !== 'object') {
        return false
    }

    return deepEq(a, b, aStack, bStack)
}

function deepEq(a, b, aStack, bStack) {
    const aClassName = toString.call(a)
    const bClassName = toString.call(b)

    // 类型不同，直接 false
    if (aClassName !== bClassName) return false

    switch (aClassName) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b
        case '[object Number]':
            if (+a !== +a) return +b !== +b
    }

    const aIsArray = aClassName === '[object Array]'

    if (!aIsArray) {
        // 函数直接返回 false
        if (isFunction(a) || isFunction(b)) return false

        const aCtor = a.constructor;
        const bCtor = b.constructor;
        // 如果 aCtor 和 bCtor 都存在，且不相等
        if (aCtor !== bCtor && isFunction(aCtor) && isFunction(bCtor)) {
            return false
        }
    }

    aStack = aStack || []
    bStack = bStack || []
    let length = aStack.length
    // 循环引用时，必须都是相同循环引用的情况
    // 检查栈中的元素是否有 当前比较的元素
    while (length--) {
        if (aStack[length] === a) {
            console.log('a, b', a, b);
            return bStack[length] === b
            // if (bStack[length] !== b) return false
        }
    }
    console.log(a, b);
    aStack.push(a)
    bStack.push(b)

    if (aIsArray) {
        length = a.length
        if (length !== b.length) return false
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) return false
        }
    } else {
        const keys = Object.keys(a)
        let length = keys.length
        if (Object.keys(b).length !== length) return false
        while (length--) {
            key = keys[length]
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) {
                return false
            }
        }
    }

    aStack.pop()
    bStack.pop()
    return true
}

var a = { name: { a: 1 }, c: { z: '' } }
var b = { name: { a: 1 }, c: { z: '' } }
// a.c.z = a.name
// b.c.z = b.name
console.log(eq(a, b));  // false
console.log(eq('hello', new String('hello'))); // true