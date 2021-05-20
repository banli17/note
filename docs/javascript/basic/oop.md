# JS 面向对象

## 原型到原型链

- 每个函数都有一个 prototype 属性，指向原型。
- 构造函数原型的 constructor 指向它本身
- 实例的 `__proto__`属性指向其构造函数的原型对象
- 原型对象也有一个自己的原型对象，层层向上，最上层为 Object.prototype，而`Object.prototyp.__proto__` 为 null，这一条链叫做原型链。对象上如果没找到某个属性，会到原型链上查找。

![](./imgs/2021-05-06-21-49-30.png)

注：`__proto__` 是非标准的属性，可以通过 es5 的 Object.getPrototype(o) 替代。

继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

特别注意的是 Function：它实际有 3 种角色：构造函数、函数、对象

```js
Function.prototype.__proto__ === Object.prototype; // true
Function.__proto__ === Function.prototype; // true
// Function 作为对象
Function.__proto__.__proto__ === Object.prototype; // true
// Object 作为函数
Object.__proto__ === Function.prototype; // true
```

![](./imgs/2021-05-06-22-01-26.png)
