"use strict";
/**
 * 数据类型
 * boolean
 * number
 * string
 * string[]
 * Array<number>  只有一个参数
 * Array<number|string|boolean>
 * Array<any>
 * 元组(tuple): 长度和类型都是不可变的
 * 枚举：事先考虑到一个变量所有可能的值。定义好之后只能取值，方便管理防止出错
 * any
 * null undefined
 * void 表示没有返回值，一般用于函数
 * never 代表不会有返回值，比如总是抛出异常，或者没有返回值的死循环函数
 * object
 */
var isMarried = true;
void let;
hobbies: string[] = ['hi', 'yy'];
var numbers = [4, 5, 6];
// tuple
var s = ['hello', 3];
// 枚举
var Gender;
(function (Gender) {
    // BOY
    Gender["GIRL"] = "\u5973\u5B69";
    Gender["BOY"] = "\u7537\u5B69";
})(Gender || (Gender = {}));
console.log(Gender.BOY);
// any 任何类型，任何值。放弃检查
var root = document.getElementById('root');
// root.style.color = 'hello'  // 有可能没有root: null
var root1 = document.getElementById('root');
root1.style.color = 'red';
// 可以用!强制取值
root1.style.color = 'blue';
var age = 1;
age = 'hi';
// null 和 undefined
var x;
x = 10;
x = undefined;
x = null;
// 没有赋值的变量不能使用
//let y: number
//console.log(y)  // 报错：在未赋值前使用
// 使用了void，但是返回了
// function greeting(name: string): void {
//     console.log(name);
//     return 'ok'  
// }
// function greeting(name: string): string{
//     console.log(name);
//     return 'ok'  
// }
// greeting('hello');
var error;
error = (function () {
    throw new Error('wrong');
})();
var obj = { name: 'hi' };
var axfn = function () { };
var ax = axfn();
var parse = function (str) {
    return JSON.parse(str);
};
parse('{"name":"zs"');
