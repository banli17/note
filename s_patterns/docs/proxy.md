---
title: "代理模式"
sidebar_label: 代理模式
---

## 简介

代理模式(proxy pattern)是通过代理去访问对象，代理提供了一些拦截操作。操作者操作的是代理。

比如送花，X 需要给 A 送花，但是不好意思，于是委托好朋友 B 给 A 送花。

![](./imgs/proxy-uml.png)

```javascript
const Flower = function() {};
const X = {
    sendFlower: function() {
        B.receiveFlower();
    }
};
const B = {
    receiveFlower: function() {
        if (A.happy) {
            // 当A开心时
            var f = new Flower();
            A.receiveFlower(f);
        }
    }
};
const A = {
    happy: false,
    receiveFlower: function(flower) {
        console.log("A收到花了");
    }
};

X.sendFlower();
```

上面代码可以看出：

1. 代理和目标对象提供了相同的接口，使得操作者仿佛是操作目标对象一样。
2. 代理保护：可以拒绝一些对目标对象访问，比如 A 不开心的时候就不送花。
3. 虚拟代理：可以延迟 Flower 对象在需要的时候才创建，不需要在`X.sendFlower`中创建，这样节省了内存。

## 图片预加载

图片预加载常用的方法是先用一张 loading 图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到 img 节点里，这种场景就很适合使用虚拟代理（等准备好后再执行本体）。

```javascript
var myImage = (function() {
    var imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    };
})();
var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function(src) {
            myImage.setSrc("loading.gif");
            img.src = src;
        }
    };
})();
proxyImage.setSrc("https://static.xiaohuochai.site/icon/icon_200.png");
```

这样做的好处是符合单一职责原则。本来是只需要给 img 节点设置 src。预加载只是让效果更好的功能。于是代理的作用在这里就体现出来了，代理负责预加载图片，预加载的操作完成之后，把请求重新交给本体 MyImage。即使有一天不需要代理了，只需要修改成请求本体即可。

代理对象和本体都对外提供了 setSrc 方法，在客户看来，代理对象和本体是一致的， 代理接手请求的过程对于用户来说是透明的，用户并不清楚代理和本体的区别，这样做有两个好处：

1. 用户可以放心地请求代理，只关心是否能得到想要的结果；
2. 在任何使用本体的地方都可以替换成使用代理。

## 合并 http 请求

频繁的 http 请求会造成巨大的开销，有时我们可以在代理中通过延迟来合并 http 请求。比如：

```javascript
var synchronousFile = function(id) {
    console.log("开始同步文件，id 为: " + id);
};

var proxySynchronousFile = (function() {
    var cache = [], // 保存一段时间内需要同步的ID
        timer; // 定时器
    return function(id) {
        cache.push(id);
        if (timer) {
            // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function() {
            synchronousFile(cache.join(",")); // 2 秒后向本体发送需要同步的ID 集合
            clearTimeout(timer); // 清空定时器
            timer = null;
            cache.length = 0; // 清空ID 集合
        }, 2000);
    };
})();

var checkbox = document.getElementsByTagName("input");
for (var i = 0, c; (c = checkbox[i++]); ) {
    c.onclick = function() {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    };
}
```

## 虚拟代理在惰性加载中的应用

比如调试打印内容，可以先把打印内容收集起来，当用户通过 f2 打开控制台的时候才加载 js 并执行打印操作。

```javascript
var miniConsole = (function() {
    var cache = [];
    var handler = function(ev) {
        // 按下f2时踩加载miniConsole.js
        if (ev.keyCode === 113) {
            var script = document.createElement("script");
            script.onload = function() {
                for (var i = 0, fn; (fn = cache[i++]); ) {
                    fn();
                }
            };
            script.src = "miniConsole.js";
            document.getElementsByTagName("head")[0].appendChild(script);
            document.body.removeEventListener("keydown", handler); // 只加载一次miniConsole.js
        }
    };
    document.body.addEventListener("keydown", handler, false);
    return {
        log: function() {
            var args = arguments;
            cache.push(function() {
                return miniConsole.log.apply(miniConsole, args);
            });
        }
    };
})();

miniConsole.log(11); // 开始打印log
// miniConsole.js 代码
miniConsole = {
    log: function() {
        // 真正代码略
        console.log(Array.prototype.join.call(arguments));
    }
};
```

## 缓存代理

有时我们可以将结果缓存到缓存代理中，下次又计算相同内容时，将结果直接从缓存中取出来。

```javascript
/**************** 计算乘积 *****************/
var mult = function() {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};
/**************** 计算加和 *****************/
var plus = function() {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function(fn) {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ",");
        if (args in cache) {
            return cache[args];
        }
        return (cache[args] = fn.apply(this, arguments));
    };
};

var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
alert(proxyMult(1, 2, 3, 4)); // 输出：24
alert(proxyMult(1, 2, 3, 4)); // 输出：24
alert(proxyPlus(1, 2, 3, 4)); // 输出：10
alert(proxyPlus(1, 2, 3, 4)); // 输出：10
```

在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。

## \$.proxy

jQuery 里的 \$.proxy(fn, this) 可以将函数里的 this 进行代理。

```javascript
el.onclick = function() {
    $.proxy(
        setTimeout(function() {
            console.log(this);
        }),
        this
    );
};
```

## ES6 Proxy

请明星做广告时，不能直接访问明星，而是要通过经纪人。如果报价低了，经纪人直接拒绝。通过 es6 的 Proxy 来实现。

```javascript
const star = {
    name: "孙悟空",
    price: 10000
};

const agent = new Proxy(star, {
    get(target, key) {
        if (key === "price") {
            console.log("访问了price");
        }
        return target[key];
    },
    set(target, key, val) {
        if (key === "customPrice") {
            if (val < target.price) {
                throw new Error("价格太低了");
            } else {
                target[key] = val;
            }
        }
    }
});

console.log(agent.price);
agent.customPrice = 100000;
```

## 代理模式和命令模式的区别

1. 代理模式目的主要是做拦截，拦截时可以延迟创建对象(虚拟代理)或缓存数据(缓存代理)。
2. 命令模式主要是将命令发出者和接受者解耦。使得发出者不需要关心接受者代码的具体实现。
3. 代理模式主要操作的对象是代理，命令模式主要操作对象是命令发出者。

## 代理模式和适配器模式，装饰者模式的区别

-   代理模式主要用于访问权限的控制，提供一模一样的接口，仿佛有权限访问原对象，功能是经过限制的。
-   适配器模式是提供不同的接口，处理不兼容，比如插头的转换。
-   装饰器模式目的是新增功能，原功能不变。

## 总结

1. 送花的故事
2. jQuery 的\$.proxy
3. es6 Proxy 明星拍广告的故事
4. 虚拟代理的作用，保护代理的作用
5. 什么是单一职责原则：一个类应该只有一个发生变化的原因
6. http 合并请求
7. 图片预加载，将预加载和插图片分开
8. 虚拟代理在惰性加载中的应用，将延迟到需要的时候再创建，先收集打印内容，再加载 miniConsole.js 后执行。
9. 缓存代理
