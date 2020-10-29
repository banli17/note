const assert = require('assert');

class Point {
    static PI = 3.14;
    x = 1;

    constructor() {
        console.log('Point constructor')
    }

    static getPI() {
        return this.PI;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        console.log('ColorPoint constructor')
        // super 用来新建父类的 this 对象，子类必须在构造函数中调用 super 方法，否则新建实例会报错
        // 因为子类的this 需要父类构造后再对其加工，如果不调用 super，子类就得不到 this
        // 和 java 不同，不会隐式调用
        // es5 是先创建子类this，再 Parent.apply(this)，而 es6 不同，是需要先将父类实例属性和方法加到 this 上，再修改this
        // 类如果没有写 constructor，会自动创建一个构造函数 constructor(...args) {super(...args)}
        super(x, y);
        this.color = color;
    }


    toString() {
        return this.color + ' ' + super.toString();
    }
}

let cp = new ColorPoint(10, 10, 'red');

assert(cp instanceof ColorPoint);
assert(cp instanceof Point);
console.log(cp.toString());

// 子类会继承父类的静态方法和属性
assert(ColorPoint.PI == 3.14)
assert(ColorPoint.getPI() == 3.14)

// 实例会继承父类的实例属性和方法
assert(cp.x == 1)

// 获取对象的原型对象
assert(Object.getPrototypeOf(ColorPoint) === Point)
assert(ColorPoint.__proto__ == Point)  // true
