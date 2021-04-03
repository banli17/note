---
title: let 和 const
---

# ES6 系列之 let 和 const

## var 的问题

1. 变量提升
2. 循环问题

```js
for (var i = 0; i < 2; i++) {
    div[i].onClick = function() {
        console.log(i);
    };
}
console.log(i); // 2
```

所以 es6 引入了块级作用域。存在于：函数内部、{} 中。

## let 和 const

1. 不会被提升，在声明前使用会报错
2. 重复声明报错
3. 不绑定全局作用域，即不会挂载到 window 上
4. const 不能修改绑定，但允许修改值(对象时)

## 临时死区

临时死区(Temporal Dead Zone)，简称 TDZ。

let 和 const 声明的变量不会提升到作用域顶部，在声明前访问会报错。

js 引擎在扫描变量时，会将 var 声明提前，let 和 const 放在 TDZ 中，在访问 TDZ 中变量会发生错误，只有执行过变量声明语句后，变量才会从 TDZ 中移出，才可以访问。

```js
{
    console.log(a); // 报错，a 还在 TDZ 中
    let a = 1; // a 从 TDZ 中移出
}
```

## 循环

```js
for (let i = 0; i < 3; i++) {
    div[i].onClick = function() {
        console.log(i);
    };
}
```

上面是 重复定义 i? 应该报错？ let 声明在循环内行为在标准中专门定义的。

let 会创建一个隐藏的作用域。每次迭代会创建一个新变量，并将之前同名变量的值赋值给新变量进行初始化。

如果用 const 会报错，因为在循环中 const a = 0; 之后尝试赋新值初始化。

for in 循环也是一样的，用 let 会创建新的绑定。

```js
for (let i in o) {
    div[i].onClick = function() {
        console.log(i);
    };
}
```

## Babel 编译 let 和 const

```js
// example 1
let value = 1;
// 编译后
var value = 1;

// example 2
if (false) {
    let value = 1;
}
// 编译后
if (false) {
    var _value = 1;
}

// example 3
let value = 1;
{
    let value = 2;
}
value = 3;
// 编译后
var value = 1;
{
    var _value = 2;
}
value = 3;

// example 4
var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs[i] = function() {
        console.log(i);
    };
}
// 编译后
var funcs = [];

var _loop = function _loop(i) {
    funcs[i] = function() {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}

// example 5
for (let i = 0; i < 3; i++) {
    let i = "abc";
    console.log(i); // 输出 3 次 abc，上面两个 i是不同的
}
// 编译后，因为没有必要为 i 新建作用域
for (var i = 0; i < 3; i++) {
    var _i = "abc";
    console.log(_i); // 输出 3 次 abc，上面两个 i是不同的
}
```

## 总结

1. var 的问题： 挂载全局，提升，多次声明覆盖，循环问题
2. 什么是临时死区? let const 声明的变量会进入临时死区，代码执行后才可访问。
3. let 循环的过程中如何执行？声明新变量，赋予旧值。所以 const 会报错，因为要赋值。
4. babel 如何编译 let const？

-   [babel 在线编译工具](https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYewTgBAFANgpgFwgSwgXggBgNwogHggGZdkBqMgSggG8AoCRieJVDAIgEMAjAY3ewMmvEADsAziHgA6GCADmUZJVwB6VREDJ8YC_FYhECE1hB69AMP-AoOUBG6YBI5QFRyKQPRmgWDlAMCqAQtzoBfIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=unambiguous&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=true&targets=&version=7.8.7&externalPlugins=)
