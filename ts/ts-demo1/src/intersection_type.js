"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 交叉类型，取并集
var pet = {
    run: function () { },
    jump: function () { }
};
// 联合类型
var intera = 1;
// 字面量类型，限定取值范围
var b = 'c';
var c;
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.run = function () { };
    Dog.prototype.eat = function () { };
    return Dog;
}());
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.jump = function () { };
    Cat.prototype.eat = function () { };
    return Cat;
}());
var Master;
(function (Master) {
    Master[Master["Boy"] = 0] = "Boy";
    Master[Master["Girl"] = 1] = "Girl";
})(Master || (Master = {}));
function getPet(master) {
    var pet = master === Master.Boy ? new Dog() : new Cat();
    // pet.run();
    pet.eat();
    return pet;
}
function area(s) {
    switch (s.kind) {
        case 'square':
            return s.size;
        case 'rectangle':
            return s.width * s.height;
        case 'circle':
            return s.r;
        default:
            // 永远不会执行，说明前面的分支都走到了
            return (function (e) { throw new Error(e); })(s);
    }
}
console.log(area({ kind: 'circle', r: 1 }));
