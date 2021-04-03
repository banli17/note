"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
{
    // 类型推断
    var a_1 = 1; // let a: number
    // strictNullChecks: true 将 null 单独分类，false 作为其它类型的子类型
    var b = [1, null];
    // 默认为 true let b: (number | null)[]
    // false let b: (number)[]
    // let c: (x?: number) => number
    var c = function (x) {
        if (x === void 0) { x = 1; }
        return x + 1;
    }; // (parameter) x: number
    window.onkeydown = function (event) {
        console.log(event.button); // event 没有 button 属性
    };
    // let foo = {} as Foo //类型断言,明确高速 ts 是什么类型
    // foo.bar = 1
    // 推荐初始化时指定类型并赋值
    var foo = {
        bar: 1
    };
}
{
    // 类型兼容
    var a_2 = 'hello';
    a_2 = null;
    var x = { a: 1, b: 2 };
    var y = { a: 1, b: 2, c: 3 };
    x = y;
    y = x;
    function hof(handler) {
        return handler;
    }
    // 1) 参数个数
    var handler1 = function (a) { };
    hof(handler1);
    var handler2 = function (a, b, c) { };
    // hof(handler2)
    // 可选参数和剩余参数
    var d = function (p1, p2) { };
    var e_1 = function (p1, p2) { };
    var f_1 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    d = e_1;
    d = f_1;
    e_1 = f_1;
    f_1 = e_1;
    var p3d = function (point) { };
    var p2d = function (point) { };
    p3d = p2d;
    p2d = p3d; // "strictFunctionTypes": false
    // 返回值类型
    var g = function () { return ({ name: 'hi' }); };
    var h = function () { return ({ name: 'hi', age: 12 }); };
    g = h;
    // h = g 
}
function overload(a, b) { } // 实现
// 枚举兼容性
var Fruit;
(function (Fruit) {
    Fruit[Fruit["Apple"] = 0] = "Apple";
    Fruit[Fruit["Banana"] = 1] = "Banana";
})(Fruit || (Fruit = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
})(Color || (Color = {}));
var fruit = 3;
var no = Fruit.Apple;
console.log(Fruit.Banana);
// let color: Color.Red = Fruit.Apple  // 枚举之间不兼容
// 类兼容性
// 属性少的不能给多的
var A = /** @class */ (function () {
    function A(p, q) {
        this.id = 1;
        this.c = 1;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B(p) {
        this.id = 2;
    }
    B.s = 1;
    return B;
}());
var aa = new A(1, 2);
var bb = new B(1);
// aa = bb
bb = aa;
var CC = /** @class */ (function (_super) {
    __extends(CC, _super);
    function CC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.age = 12;
        return _this;
    }
    return CC;
}(A));
var cc = new CC(1, 3);
cc = aa;
aa = cc;
var obj1 = { value: 2 };
var obj2 = { value: 'hi' };
obj1 = obj2;
var l1 = function (x) {
    console.log('x');
    return x;
};
var l2 = function (y) {
    console.log('y');
    return y;
};
l1 = l2;
