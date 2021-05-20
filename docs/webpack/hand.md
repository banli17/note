# webpack 手写实现

## 预备知识

### Symbol.toStringTag

Object.prototype.toString() 方法会去读取对象(包装对象) 的 Symbol.toStringTag 属性并把它包含在自己的返回值里。

```js
const a = {
  name: "张三",
};
console.log(Object.prototype.toString.call(a)); // [object Object]

Object.defineProperties(a, {
  age: {
    value: 12,
    // enumerable: false 默认为 false
  },
  [Symbol.toStringTag]: {
    value: "人",
  },
});

console.log(a); // { name: '张三' }  age 属性默认不可枚举
console.log(Object.prototype.toString.call(a)); // [object 人]

class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```
