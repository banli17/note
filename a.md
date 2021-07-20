for...in
 能遍历自己对象上的的可枚举属性和还遍历了原型上可枚举属性。

Object.keys()
上面只打印出来的name，说明Object.keys方法只能遍历自己的对象上的可枚举的属性，不能遍历自己原型上可枚举的属性。

Object.getOwnPropertyNames(遍历自身对象的所有属性，包括可枚举不可枚举，但是原型上的属性是无法遍历的。


var bg = (Math.random() * 0xffffff) >> 0
domElement.style.background = '#' + bg.toString(16)

https://github.com/mrdoob/stats.js