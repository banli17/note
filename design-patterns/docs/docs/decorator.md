---
title: "javascript 装饰器模式"
sidebar_label: 装饰器模式
---

装饰器模式是不改变原来的结构和功能，给对象添加新功能。

下面是实现的代码：

```javascript
class A {
    plus() {}
}

class Decorator {
    constructor(target) {
        this.target = target;
    }
    plus() {
        this.target.plus();
    }
    subtract() {}
}

class Client {
    constructor(a, decorator) {
        this.a = a;
        this.decorator = decorator;
    }
}

let a = new A();
let d = new Decorator(a);
d.plus();
d.substract();

let c = new Client(a, decorator);
c.a.plus();
c.decorator.substract();
```

上面的代码可以看到，装饰器实际是对原来的对象进行了一层包装，它具有原来对象的方法，并且能新增一些方法。可以个人认为有些问题：

1. 如果 A 里面有很多个方法。Decorator 里岂不是都需要写一遍？可以使用克隆原型属性的方法解决。
2. 如何给 A 添加新的属性呢？可以在装饰器里定义一个方法给 target 设置新属性解决。
3. 为什么不使用继承呢？

《javascript 设计模式与开发实践》里解释了为什么不使用继承。原因如下：

1. 继承使父类和子类强耦合，父类改变后，子类实际也改变了。
2. 父类对子类是可见的，也就是通过子类，知道父类的实现，这破坏了封装性。

上面的装饰器模式确实没有这 2 个问题。实际上上面的 Decorator 完全可以用一个函数来实现：

```javascript
function decorator(target) {
    target.num = 13;
    target.prototype.substract = function() {};
}
```

使用函数可以很方便的增加属性和方法，个人觉得这种用法要比上面用 Decorator 类更好些。

实际应用场景

AOP 切面

装饰器的目的就是新增一些功能。比如需要在函数执行前后执行一些方法，可以写下面 2 个方法：

```javascript
function before(fn, beforeFn) {
    return function() {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    };
}

function after(fn, afterFn) {
    return function() {
        let ret = fn.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    };
}
```

因为 before 方法里的 fn,beforeFn 都使用了 arguments，所以可以在 beforeFn 里对 arguments 进行修改。

比如希望在点击按钮后上报一些数据：

```javascript
function clickHandler() {}
function log() {
    // 上报数据
}
el.onclick = after(clickHandler, log);
```

或者在当前项目请求数据需要添加 token，但是其它项目不需要。为了不修改基础的 ajax 方法。我们可以像下面这样：

```javascript
function ajax(options) {}
ajax = ajax.before(function(options) {
    options.params.token = "xxx";
});
```

表单提交时验证也可以用过装饰器模式来实现。通过我们表单校验的代码如下：

```javascript
function submit() {
    if (!validate()) return;
    // 验证通过...
}
```

但是如果我们不想将表单提交的 submit()方法和表单校验 validate()方法混合在一起。可以使用下面的方法：

```javascript
function submit() {
    console.log('submit')
}

function validate(params) {
    console.log('validate')
    if (params) return
}

function before(fn, beforeFn) {
    return function () {
        if (beforeFn.apply(this, arguments) === false) return
        return fn.apply(this, arguments)
    }
}

submit = before(submit, validate)
submit(false))
```

总结

-   装饰器模式最好使用函数来实现，在这个函数里直接对对象进行处理。
-   有时候我们不想让一个对象太复杂，这时可以使用装饰器模式动态来添加方法。
-   如果嵌套多个装饰器，函数作用域会很长，性能会有影响。

装饰器模式和代理模式

装饰器模式和代理模式都使用了另一个对象进行操作。它们的区别是设计目的。装饰器模式是增加功能，是一开始不能确定对象的全部功能，可以形成很长的装饰链。而代理模式是做一些拦截，提供访问权限，只有一级。

es7 装饰器

es7 已经有了装饰器，生产中使用需要安装插件`babel-plugin-transform-decorators-legacy`。

core-decorators

-   [core-decorators](https://github.com/jayphelps/core-decorators)
