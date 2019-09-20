---
title: "javascript 工厂模式"
sidebar_label: 工厂模式
---

工厂模式是一个创建型模式，它将创建者和构造函数分离，把创建对象的操作(new)封装在工厂类中，让上层只需要使用工厂的方法来创建对象，不用关心工厂中产品的实现。

**代码示例**

```javascript
class Product{
    constructor(name){
        this.name = name
    }
    init(){}
}

class Creator{
    create(name){
        return new Product(name)
    }
}

let creator = new Creator()
let p = creator.create('p1')
p.init()
```

上面的代码可以看到，我们调用工厂creator的create方法就可以创建产品，如果产品有变化，比如产品停产或换产品了，只需要在工厂类内部处理，无需修改上层代码。

**场景**

**1、jquery实例的创建就是工厂模式**

```javascript
window.$ = function(selector) {
  return new jQuery(selector)
}
```

这样我们只需要使用`$()`即可，如果使用`new $()`书写起来麻烦，而且链式调用会很繁杂(以为都需要写 new)。另外如果jQuery名称修改为了zQuery，那么上层代码都需要修改。

**2、React.createElement也是工厂模式**

```javascript
React.createElement("div", null, {})

React.createElement = function(tag, attrs, children) {
   return new Vnode(tag, attrs, children)
}
```


- [javascript设计模式(2): 抽象工厂模式]