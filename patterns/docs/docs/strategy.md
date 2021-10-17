---
title: "javascript 策略模式"
sidebar_label: 策略模式
---


- 书籍《javascript设计模式与开发实际》

策略模式是定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

比如下面的代码：

```javascript
function do(x){
    if(x == 'A'){
        //...
    }
    if(x == 'B'){
        //...
    }
    if(x == 'C'){
        //...
    }
    ....
}
```

上面的代码if分支太多，而且如果执行Z，上面的if分支都需要判断一遍。可以用策略模式来改写它。

```javascript
class A{
    do(x){}
}
class B{
    do(x){}
}
class C{
    do(x){}
}
....

function do(o, x){
    o.do()
}

let a = new A()
do(a, x)
```

可以看到，只需要传入对应的策略，执行方法即可。

