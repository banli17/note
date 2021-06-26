# JS 执行机制

## 简介

- JS 代码在执行过程中，会创建相应的执行上下文。执行上下文是通过一个栈进行管理的。
- 执行上下文包含变量对象(VO)、Scope chain(作用域链) 和 this
- 作用域链和闭包是息息相关的，闭包数据的查找就是通过它

本文将详细介绍它们之间的关系。

## 作用域

作用域是指程序源代码中定义变量的区域，它用来确定当前执行代码对变量的访问权限。

作用域的实现分为：

- 静态作用域：是在词法解析时确定的。
- 动态作用域：是指函数的作用域是在函数调用的时候才决定的。

JS 采用词法作用域(lexical scoping)，也就是静态作用域。所以函数的作用域在函数定义的时候就决定了。为了实现这种词法作用域，函数内部需要保存函数代码和作用域链的引用。函数对象之间可以通过作用域链关联起来。外部函数变量可以保存在内部函数的作用域中，这被称为闭包。

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 1
```

## 执行上下文

当 js 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

js 可执行代码有：全局代码、函数代码、eval 代码。

执行上下文是通过一个栈来管理的。当函数执行时，会创建执行上下文并压入到栈中，当函数执行完成后，会从栈中弹出。

一个执行上下文的生命周期可以分为 3 个阶段。

1. 创建阶段：在这个阶段中，执行上下文会分别创建变量对象(Variable object, VO，存储上下文中定义的变量和函数，此时属性不能访问)，建立作用域链(Scope chain)，以及确定 this 的指向。
2. 代码执行阶段：这个阶段会将变量对象激活(称为活动对象 AO，可以访问)，并且会完成变量赋值，函数引用，以及执行其他代码。
3. 销毁阶段

::: tip
- 变量对象(`VO`)和活动对象(`AO`)其实都是同一个对象，只是处于执行上下文的不同生命周期。
- 全局上下文的变量对象初始化是全局对象
- 函数上下文中，用活动对象(`activation object, AO`)来表示变量对象。
  - 活动对象在进入函数上下文时被创建，初始化时变量对象只包括 Arguments 对象。
  - 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值。
  - 在代码执行阶段，会再次修改变量对象的属性值。
:::

举个例子：

```js
function foo(a) {
  var b = 2;
  function c() {}
  var d = function () {};

  b = 3;
}

foo(1);
```

在创建上下文时，AO 是：

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

## 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

- 作用域链与一个执行上下文相关，变量对象的链用于在标识符解析中变量查找。
- 函数上下文的作用域链在函数调用时创建的，包含活动对象和这个函数内部的[[scope]]属性。
- `[[scope]]`保存这所有父变量对象的列表。

```js
fnScopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: undefined,
  },
  Scope: [AO, [[Scope]]],
};
```

## 分析代码执行流程

分析下面代码的执行：

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope();
```

1. 执行全局代码，创建全局上下文

```
ECStack = [
  globalContext
];
```

2. 初始化全局上下文，初始化函数

```
globalContext = {
  VO: [global],
  Scope: [globalContext.VO],
  this: globalContext.VO
}

checkscope.[[scope]] = [
  globalContext.VO
]
```

3. 执行 checkscope 函数，创建函数执行上下文，并压入栈

```
ECStack = [
  checkscopeContext,
  globalContext
]
```

4. checkscope 函数执行，初始化上下文
   - 会复制 `[[scope]]` 属性创建作用域条
   - 用 arguments 创建活动对象
   - 初始化活动对象，即形参、函数声明、变量声明
   - 将活动对象压入 checkscope 作用域链顶端

```
checkscopeContext = {
  AO: {
    arguments: {length: 0},
    scope: undefined,
    f: reference to function f(){}
  },
  Scope: [AO, globalContext.VO],
  this: undefined  // 标识符、base value 是 EnvironmentRecord
}
```

5. 执行 f，和步骤 3，4 相同
6. f 执行沿着作用域链查找 scope，返回 scope 值
7. 弹出栈
