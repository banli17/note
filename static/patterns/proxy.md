# 代理模式

例子：X 不认识 A，B 认识 X 和 A，所以X委托B做代理，向A送花，而且B选择在A开心的时候送花。

```
const Flower = function(){}
const X = {
    sendFlower: function(){
        B.receiveFlower()
    }
}
const B = {
    receiveFlower: function(){
        if(A.happy){  // 当A开心时
            var f = new Flower()
            A.receiveFlower(f)
        }
    }
}
const A = {
    happy: false,
    receiveFlower: function(flower){
        console.log('A收到花了')
    }
}
```

上面代码可以看出，代理模式的作用：
1. 代理保护：可以拒绝一些对目标对象访问，比如A开心的时候才送花。
2. 虚拟代理：可以延迟Flower对象在需要的时候才创建，不需要在X.sendFlower中创建，这样节省了内存。

保护代理用于控制不同权限的对象对目标对象的访问，但在js中不容易实现，因为我们无法判断谁访问了谁。虚拟代理是最常见的一种代理模式，下面主要讨论也是虚拟代理。

## 虚拟代理实现图片预加载

```
const myImage = (()=>{
    return {
        setSrc(src){
            $('img').src = src
        }
    }
})();
const proxyImage = (()=> {
    var img = new Image()
    img.onload = ()=> {
        myImage.setSrc(this.src)
    }
    return {
        setSrc(){
            myImage.setSrc('load.gif')
            img.src = src
        }
    }
})()
proxyImage.setSrc('xx.jpg')
```

上面的虚拟代理模式的好处是单一职责原则。单一职责原则指的是，就一个类(通常也包括对象和函数等)而言，应该仅有一个引起它变 化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可 能会有多个。面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多， 等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计。当变化发生时，设计可能 会遭到意外的破坏。

如果不需要预加载了，只需要修改proxyImage成myImage即可。如果不适用proxyImage，将所有逻辑写在myImage里，则比较麻烦。

代理的方法和本体的方法是一致的。

## 虚拟代理在惰性加载中的应用


## 缓存代理

在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。



## 代理模式和命令模式的区别

1. 代理模式目的主要是做拦截，拦截时可以延迟创建对象(虚拟代理)或缓存数据(缓存代理)。
2. 命令模式主要是将命令发出者和接受者解耦。使得发出者不需要关心接受者代码的具体实现。
3. 代理模式主要操作的对象是代理，命令模式主要操作对象是命令发出者。


## 参考资料

- 书籍：javascript设计模式与开发实践【曾探】