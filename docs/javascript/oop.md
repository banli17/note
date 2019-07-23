---
id: oop
title: "javascript 面向对象"
sidebar_label: 面向对象
---


## 关于 this

### this 解析

> 涉及面试题：如何正确判断 this？箭头函数的 this 是什么？

this 的本质是函数执行时的上下文环境。代码中 this 其实很简单，谁调用它，this 就指向谁。

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```

上面代码，`foo()` 执行时，没有指定调用对象，调用对象就是全局 global 对象。所以在浏览器中，this 就指向 window。`obj.foo()`是通过 obj 调用，所以 this 指向 obj。最后，`new foo()`时，this 就是 new 创建的对象 c。

要注意，箭头函数是没有 this 的，它也不能通过 bind 绑定 this。箭头函数中的 this 实际会查找上级作用域链。

```js
function a() {
    return () => {
      console.log(this)
    }
}
a()()
```

上面代码中，箭头函数是没有 this 的，所以 this 是函数 a 的，指向 window。

