---
title: "javascript 适配器模式"
sidebar_label: 适配器模式
---

适配器模式的主要用途是兼容旧接口。

代码1

```javascript
class Adaptee {
    oldFn(){}
}

class Target {
    constructor(){
        this.a = new Adaptee()
    }
    newFn(){
        // 修改 this.a.oldFn
    }
}

const t = new Target()
t.newFn()
```

代码2

```javascript
class A{
    show(){}
}

class B{
    display(){}
}

class AdapteB{
    show(){
        // 转换插头
        return B.display()
    }
}

function render(obj){
    obj.show()
}
// 之前 render(new A)
// 现在
render(new AdapteB)
```

场景

- 用于兼容旧接口。
- vue computed

```javascript
// 历史全是$.ajax，现在要用vue，自己封装一个 ajax()
function ajax() {
    
}

var $ = {
    ajax: function(options) {
        return ajax(options)
    }
}
```

设计原则

- 将旧接口和使用者分离
- 符合开放封闭原则
