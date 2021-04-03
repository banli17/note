"use strict";
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.speak = function (words) {
        console.log(this.name + " speak " + words);
    };
    return Dog;
}());
var d = new Dog('mm');
d.speak('hello');
