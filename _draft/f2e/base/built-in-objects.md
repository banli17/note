---
title: "Date日期"
date: 2018-02-08 01:01:48
toc: true
---

- [JavaScript 日期权威指南](https://juejin.im/entry/5b7d03306fb9a01a031af59b)
- https://juejin.im/entry/5835b54cc4c9710054a6093c
- http://momentjs.cn/docs/#/durations/

Date 日期是工作中经常要使用的对象。首先必须了解一下它的兼容性Bug，再介绍它的详细使用方法。

## 兼容性Bug(重要)

通过`new Date('2018-09-01 00:09:00')`这样的形式来生成日期，在 chrome 下是正常的，但是在 safari 下显示`Invalid Date`。所有浏览器都兼容的写法如下：

```javascript
var d = new Date(2011, 01, 07); // yyyy, mm-1, dd  
var d = new Date(2011, 01, 07, 11, 05, 00); // yyyy, mm-1, dd, hh, mm, ss  

var d = new Date("2011/02/07"); // "mm/dd/yyyy"  
var d = new Date("2011/02/07 11:05:00"); // "mm/dd/yyyy hh:mm:ss"  
var d = new Date("02/07/2011"); // "mm/dd/yyyy"  
var d = new Date("02/07/2011 11:05:00"); // "mm/dd/yyyy hh:mm:ss"  

var d = new Date(1297076700000); // milliseconds  
var d = new Date("Mon Feb 07 2011 11:05:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC  
```

所以只需要将 `-` 替换为 `/` 就可以了。

## 简介

- `UTC`: 
- `GMT`:

## Date构造函数

使用`new Date()`可以返回一个当前日期对象。如果不使用`new`关键字，将会返回一个时间字符串。

```javascript
Date('2019-01-02')          // "Fri Jan 04 2019 16:39:45 GMT+0800 (中国标准时间)"
typeof Date('2019-01-02')   //"string"

new Date('2019-01-02')      // Wed Jan 02 2019 08:00:00 GMT+0800 (中国标准时间)
typeof new Date('2019-01-02') // "object"
```

new Date()传参数的形式有下面四种:

```javascript
// 不传参数，返回客户端当前的时间对象
new Date()

// 参数形式为时间戳，单位是毫秒
new Date(1453094034000)

// 参数形式为时间字符串
new Date('1995-12-17T03:24:00')

// 参数形式为年,月,日,时,分,秒,毫秒
new Date(1995, 11, 17);               // Sun Dec 17 1995 00:00:00 GMT+0800 (中国标准时间)
new Date(1995, 11, 17, 1, 2, 2, 10);  // Sun Dec 17 1995 01:02:02 GMT+0800 (中国标准时间)
```

要注意的是，在浏览器端，`new Date()`会将时间字符串自动转为本地时间。比如：

```javascript
new Date('Fri, 04 Jan 2019 08:16:01 GMT')  
// Fri Jan 04 2019 16:16:01 GMT+0800 (中国标准时间)
```

可以看到，它自动将`GMT`时间转成了`GMT+0800(中国标准时间)`，也就是加了8小时的时区差。这在做一些定时活动页面时非常有用，因为需要检测当前时间(服务器时间，不能用本地时间，通过 ajax 服务器响应头的 date 字段可以得到)是否活动已经开始了。

![](./date/1.png)




## 常用函数

**1.获取某个日期加减多少天后的日期**

```
function getNewDate(date, changeDay){
    var t = new Date(date)
    return new Date(t.getFullYear(), t.getMonth(), t.getDate()+ changeDay)
}
```

使用 `new Date(2011, 1, 10)` 表示 `2011-2-10`。直接加减日期 10 就可以获取正确的时间。

**获取几月的第几周日期区间**

```javascript
function getWeek(year, month, week){
    week = week || 0
    var d = new Date();
    d.setFullYear(year, month - 1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    week_count = Math.ceil((dd - d1 + 1) / 7);
    // console.log(year + "年" + month + "月有" + week_count +"周");
    var arr = []
    for (var i = 0; i < week_count; i++) {
        var monday = d1 + i * 7;
        var sunday = monday + 6;
        var from = year + "-" + month + "-" + monday;
        var to;
        if (sunday <= dd) {
            to = year + "-" + month + "-" + sunday;
        } else {
            d.setFullYear(year, month - 1, sunday);
            to = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        arr.push({
            index: i + 1,
            from: from,
            to: to
        })
        // console.log("第"+(i+1)+"周 从" + from + " 到 " + to + "");
    }
    return {
        arr: arr,
        w: arr[week - 1],
        week_count: week_count
    }
}
```




## 属性描述符

对象的属性描述符有两种：数据描述符和存取描述符。设置时只能设置一种。

数据描述符和存取描述符共有的：

- `configurable`: 是否可配置：可修改(引用)，可删除，默认是false。
- `enumerable`: 属性是否可枚举，默认是false。

数据描述符特有：

- `value`: 默认是 undefined。
- `writable`: 为 true 时，value 才能被修改。默认是 false。

存取描述符特有：

- `get`: 访问属性时，会执行该方法。默认是 undefined。
- `set`: 设置属性时，会执行该方法，参数是赋的新值。默认是 undefined。





## 字符的unicode表示法

js里一个字符是用2个字节表示的（UTF-16），但是有些字符是大于0xFFFF的，需要4个字节存储。js会将它当作2个字符。这会导致之前的charAt()、fromCharCode()方法有问题，所以新增了`codePointAt()`和`fromCodePoint()`方法。`for...of`可以正确判断出字符。

normalize()：unicode正规化

```javascript
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```

- includes()
- startsWith()
- endsWith()
- repeat()
- padStart()
- padEnd()

模版字符串

String.raw

