---
title: "函数式编程"
date: 2019-05-14 20:15:41
draft: false
---

## 纯函数

纯函数就是数学上的函数`y=f(x)`，通过x或y可以推出对应的y和x。一个x对应一个y，一个y可能对应多个x。

![](./imgs/fn_graph.png)

纯函数的特点：
1. 可预测的，通过x可以推测出y。所以不能使用`Math.random()`等不可预测的方法。
2. 不能改变输入，无副作用
3.

## 函数柯里化（curry）

curry 就是给函数传递一部分参数生成新的函数去处理剩余参数。可以一次性调用，也可以每次传一些参数分次调用。

```javascript
// example 1
var match = function(reg){
    return function(str){
        return str.match(reg)
    }
}
var matchHello = match(/hello/)

matchHello('xiaoming, hello!')


// example 2
var fnArr = function(fn){
    return function(arr){
        return arr.map(function(item){
            return fn(item)
        })
    }
}

var parseIntArr = fnArr(parseInt)
parseIntArr(['10', 2.0, 2.5])
```

还可以将一个函数分多次传参延迟调用。实现如下：

```javascript
function curry(fn){
    var slice = Array.prototype.slice
    var args = slice.call(arguments, 1)  // 保存参数
    return function(){
        var inargs = slice.call(arguments)
        return fn.apply(null, args.concat(inargs))  // 调用函数
    }
}

function add(x, y){
    return x + y
}

// var addCurry = curry(add(10, 11))
// var addCurry = curry(add(10))(11)
var addCurry = curry(add)(10, 11)

console.log(addCurry)
```

curry化的好处：
1. 将通用性函数生成一个更易用的函数
2. 可以让函数延迟调用

