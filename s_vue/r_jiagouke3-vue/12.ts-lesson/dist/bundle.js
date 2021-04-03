(function () {
    'use strict';

    // 扩展属性 
    String.prototype.double = function () {
        return this + this; // 隐式类型转化 一方是字符串 另一方也会转化成字符串
    };

}());
//# sourceMappingURL=bundle.js.map
