"use strict";
// 函数定义
function add1(x, y) {
    return x + y;
}
var add2;
// add1(1, 2, 3)
// 可选参数，要在必须参数之后
function add5(x, y) {
}
// 必选参数前的默认参数都要传，后面的可以不用传
function add6(x, y, z) {
    if (y === void 0) { y = 0; }
}
function add7(x) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    // reduce 求和
    return x + rest.reduce(function (prev, cur) { return prev + cur; });
}
add7(1, 2, 3, 4, 5);
// 实现，需要使用 any
function add8() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    if (typeof rest[0] === 'string') {
        return 0;
    }
    if (typeof rest[0] === 'number') {
        return 0;
    }
}
add8('hi', 'hello');
// add8('hi', 5)  检查了参数
add8(1, 2, 3); // ts 碰到这个函数时会去查找函数的定义，并根据参数类型来匹配选择哪个定义
