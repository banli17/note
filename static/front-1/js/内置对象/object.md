# Object

## Object的方法和属性
 
### Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。


Object.getOwnPropertyNames()

包括不可枚举的，但是不包含Symbol
