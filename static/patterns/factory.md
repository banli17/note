# 工厂模式

- 将 new 操作单独封装
- 遇到 new 时，就要考虑是否该用工厂模式

初始化实例的封装。

```javascript
class Product{
    constructor(name){
        this.name = name
    }
    
    init(){
        
    }
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

## 场景

**jquery $('div') 和 new $('div') 区别？**
- 书写麻烦，jQuery链式调用将成为噩梦
- 一旦jQuery 名字变化，将是灾难。

```javascript
window.$ = function(selector) {
  return new jQuery(selector)
}
```

**React.createElement**

```javascript
React.createElement("div", null, {})

React.createElement = function(tag, attrs, children) {
   return new Vnode(tag, attrs, children)
}
```

**Vue异步组件**

```javascript
Vue.component
```

设计原则验证：
- 构造函数和创建者分离
- 符合开发封闭原则
