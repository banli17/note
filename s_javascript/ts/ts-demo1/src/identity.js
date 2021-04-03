"use strict";
// 泛型
// 可以做到参数和返回值类型一样
function A(value) {
    return value;
}
A(1); // 返回 number 1
var a = A('hi'); // <string> 可以省略，因为 A('hi') 会进行类型推断。
console.log(a); // 'hi'
// 泛型类
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.run = function (value) {
        console.log(value);
        return value;
    };
    return Log;
}());
var log1 = new Log();
log1.run(1);
var log2 = new Log();
log2.run(1);
log2.run('hi');
function log(value) {
    console.log(value.length);
    return value;
}
log([]);
log({ length: 3 });
