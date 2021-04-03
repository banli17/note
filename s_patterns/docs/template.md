---
title: "javascript 模板方法模式"
sidebar_label: 模板方法模式
---


模板方法模式(template method pattern)用于子类具有相同方法和步骤，但是具体方法的实现不同。

```javascript
class Drink{
    constructor(){
    }
}
```

 应用场景

比如模块的渲染：
1. ajax发请求
2. 获取到数据，渲染模板并显示

```javascript
class RenderHtml {
    
}

var a = RenderHtml()
```

js里直接用高阶函数替换继承

```javascript
var Drink = function(params) {
    var boilWater = function() {
        console.log('boil water')
    }
    var a = params.a || function (props) {}
    return {
        init:function() {
           boilWater() 
        }
    }
}

var tea = Drink({
    a: function() {
      console.log('加茶叶')
    }
});
tea.init();
```
