"use strict";
/// <reference path="./namespace1.ts" />
var Shape;
(function (Shape) {
    function circle() { }
    Shape.circle = circle;
})(Shape || (Shape = {}));
Shape.square();
