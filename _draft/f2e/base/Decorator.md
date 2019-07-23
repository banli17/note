---
title: "es6笔记()：Decorator"
date: 2019-02-28 10:17:03
tags:
---

## 参考资料

- [阮一峰es6入门 Decorator](http://es6.ruanyifeng.com/#docs/decorator)

Decorator(装饰器)，就是一个函数，用来对类进行修改。

## 安装

要使用Decorator，需要安装插件`@babel/plugin-proposal-decorators`。

```
npm i @babel/plugin-proposal-decorators
```

然后在配置`.babelrc`。

```
{
    "plugins": ["transform-decorators-legacy"]
}
```

## 类的修饰

装饰器，就是一个函数，用来对类进行处理。

```javascript
// 装饰器
@test
class Test {
}

function test(target) {
    target.age = 12 // 给Test类添加静态属性 isTest
}

console.log(Test.age) // 12
```

还可以通过高阶函数来对装饰器进行改进，如下。

```
const test = (age) => (target) => {
    target.age = age
}

@test(16)
class Test {
}

@test(17)
class Test1 {
}

console.log(Test.age)  // 16
console.log(Test1.age)  // 17
```

装饰器对类的行为的改变，是发生在代码编译时，而不是运行时。所以装饰器本质是编译时执行的函数。

如果向在实例上添加属性。可以在装饰器里对prototype进行操作。

```javascript
const test = (age) => (target)=>{
    target.prototype.age = age
}
@test(18)
class Test{}
const t = new Test()
console.log(t.age)  // 18
```

下面是一个将方法拷贝到一个类实例上的例子。

```javascript
const mixins = (...list) => (target) => {
    Object.assign(target.prototype, ...list)
}

const Foo = {
    foo() { console.log('foo') }
}

const Too = {
    too() { console.log('too') }
}

@mixins(Foo, Too)
class Test { }

let t = new Test()

console.log(t.foo)
console.log(t.too)
```

我们可以将mixins抽出来以公用。

实际开发中react + redux 也可以使用装饰器。

```javascript
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

// 使用装饰器
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

## 方法的装饰

装饰器还可以装饰类的属性。

```javascript
const readonly = (target, name, descriptor) => {
    descriptor.writable = false
    //console.log(descriptor)
    // - configurable: true
    // - enumerable: false
    // - value: ƒ getAge()
    // - writable: false

    return descriptor
}

class Person {
    @readonly
    getAge() {
        return '12'
    }
}

let p = new Person();
console.log(p.getAge())

p.getAge = () => {return '13'}

console.log(p.getAge)
```

上面的代码，readonly装饰器参数如下：

- `target`是`Person.prototype`而不是类本身。
- `name`是方法的名称
- `descriptor`是属性描述对象。
    - `value:function`
    - `enumerable:false`
    - `configurable:true`
    - `writable:true`

装饰器需要返回一个对象，可以利用这个对象来修改原来的方法：

```javascript
const readonly = (target, name, descriptor) => {
    // 如果不返回descriptor，这句相当于不起效
    descriptor.writable = false
    
    // 这里相当于返回一个新的属性描述对象
    // 这个如果没有value，则不会影响原来的getAge方法
    return { value: () => { return 19 }}
}

p.getAge()  // 返回19
```

所以它的行为类似于defineProperty：

```javascript
Object.defineProperty(Person.prototype, 'name', descriptor)
```

既然实例调用方法的时候会调用装饰器，那么我们可以用装饰器来输出日志。只需要在装饰器里log即可。

```javascript
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

装饰器还有注释的作用。

```javascript
@testable
class Person {
    @readonly
    @nonenumerable
    name() { return `${this.first} ${this.last}` }
}
```

如上，我们一看到name就知道它是只读不可枚举的。

如果有多个装饰器，则会从外到内生成装饰器函数，再由内而外的执行装饰器函数。

```javascript
function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1    生成装饰器函数 dec(1)
// evaluated 2    生成装饰器函数 dec(2)
// executed 2     执行装饰器函数 des(2)(target)
// executed 1     执行装饰器函数 des(2)(target)
```

## 装饰器不能装饰函数

因为函数提升，所以装饰器不能作用于函数(疑惑)。如果要装饰函数，可以使用高阶函数。

```javascript
function say(name) {}

function log(fn) {
    return function () {
        console.log('start')
        const result = fn.apply(this, arguments)
        console.log('end')
        return result
    }
}

say = log(say)
say()
```

## core-decorators.js

这个库提供了很多常用的装饰器。

- `@autobind`：将方法中的this绑定原始对象
- `@readonly`
- `@override`：检查子类方法覆盖父类同名方法，不正确会报错。
- `@deprecate`或`@deprecated`:表示该方法将废除，会警告
- `@suppressWarnings`：防止`deprecated`修改器导致的`console.warn()`调用。异步代码发出的调用除外。

## 使用装饰器实现自动发布事件

很简单，就是调用方法的同时，发布事件。貌似可以用来做路由，路由切换时跳到不同的页面。

```javascript
class Test{
    @publish('click')
    say(){}
    
    @publish('toggle')
    walk(){}
}
```


## Mixin

可以用装饰器实现Mixin。所谓Mixin模式，就是对象继承的一种替代方案。

```javascript
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

// foo.js
import { mixins } from './mixins';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

不过上面的方法会改写`MyClass`类的`prototype`属性。所以可以通过类来实现`Mixin`。

```javascript
// mixin(superclass)返回一个继承自superclass的子类
const mixin = (superclass) => class extends superclass {
    walk() {
        console.log('walk from mixin')
    }
}

class Monkey { }

// mixin(Monkey)
class Person extends mixin(Monkey) { }

const p = new Person
console.log(p.walk)
```

上面的方法做到了保持Person和Monkey类的纯净，使用minxin增加了额外的方法。当然还可以混入多个方法，如`mixin1(mixin2(Monkey))`。

这样写的好处是可以调用`super`。避免在混入中覆盖父类的同名方法。

```javascript
let Mixin1 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin1');
        if (super.foo) super.foo();
    }
};

let Mixin2 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin2');
        if (super.foo) super.foo();
    }
};

class S {
    foo() {
        console.log('foo from S');
    }
}

class C extends Mixin1(Mixin2(S)) {
    foo() {
        console.log('foo from C');
        super.foo();
    }
}

new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S
```

上面的混入，可以让父类的方法行为得以保存下来，而不被覆盖调。

## Trait

Trait也是一种修饰器，效果和 Mixin 类似。但是提供了更多的功能。比如防止同名方法冲突、排除混入某些方法、为混入的方法起别名等。

下面是[`traits-decorator`](https://github.com/CocktailJS/traits-decorator)的例子。

### 拷贝方法

```javascript
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') }
};

@traits(TFoo, TBar)
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

Trait 不允许“混入”同名方法。如果有同名方法则在混入时会报错。有两种方法解决：

1. 排除某个同名方法。
2. 起别名，这样别名方法也会混入到类中

```javascript
// 排除同名方法
@traits(TFoo, TBar::excludes('foo'))

// 起别名
@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))

// 结合起来写
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}

// 结合起来写的另一种写法
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
```


## 总结

1. 什么是`Decorator`?
1. `Decorator`装饰类时函数的参数?
1. `Decorator`装饰类方法时函数的参数?
1. `Mixin`案例?
1. 两个库的基本用法。




