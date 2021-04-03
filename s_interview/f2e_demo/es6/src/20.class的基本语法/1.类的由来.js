const assert = require('assert')

/**
 * ES5 class
 */
function ES5Point(x, y) {
    this.x = x;
    this.y = y;
}

ES5Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')'
}

var p = new ES5Point(1, 2)

/**
 * ES6 class
 * 1. 类所有的实例方法实际上都定义在类的 prototype 上面
 */
class ES6Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return '(' + this.x + ',' + this.y + ')'
    }
}

assert(typeof ES6Point == 'function')
assert(ES6Point == ES6Point.prototype.constructor)

// 给类实例新增方法
Object.assign(ES6Point.prototype, {
    getX() {
        return this.x;
    }
})
let es6point = new ES6Point(3, 5)
assert(es6point.getX() == 3)

// 2. es6 中写在类里的方法是不可枚举的，es5 挂在 prototype 上可以枚举
console.log(Object.keys(ES6Point.prototype))  // ['getX']
// getOwnPropertyNames 返回所有的属性名组成的数组(包括不可枚举，但是不包括 Symbol名的属性)
console.log(Object.getOwnPropertyNames(ES6Point.prototype))  // 'constructor', 'toString', 'getX'
// es5 挂在 prototype 上可以枚举
console.log(Object.keys(ES5Point.prototype))  // [ 'toString' ]

