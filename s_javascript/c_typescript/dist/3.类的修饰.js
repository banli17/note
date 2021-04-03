"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Monkey = /** @class */ (function () {
    function Monkey(name, age) {
        this.name = name;
        this.age = age;
    }
    return Monkey;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(name, age) {
        var _this = _super.call(this, name, age) || this;
        _this.age = age;
        return _this;
    }
    Person.prototype.getAge = function () {
        return this.age;
    };
    return Person;
}(Monkey));
var p = new Person('za', 12);
console.log(p.getAge());
