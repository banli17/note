# 单例模式

- 系统中被唯一使用
- 一个类只有一个实例

```java
public class SingleObject{
    // 私有化了，外部不可以new，只能内部new
    private SingleObject(){}

    private SingleObject instance = null;

    public SingleObject getInstance(){
        if(instance == null){
            instance = new SingleObject()
        }

        return instance;
    }
}

// 获取唯一可用的对象
SingleObject object = SingleObject.getInstance();
```

## js中使用

只能靠文档去约束。

```javascript
class SingleObject{

}

SingleObject.getInstance = (function(){
    let instance
    return function(){
        if(!instance){
            instance = new SingleObject()
        }
        return instance
    }
})

let o1 = SingleObject.getInstance()
let o2 = SingleObject.getInstance()
o1 == o2  // true

// 但是还是可以new SingleObject
let o3 = new SingleObject()
```

## 场景

- jquery对象，思想是一样的，防止多次初始化。

```
if(window.jquery != null){
    return window.jquery
}else{
    // 初始化...
}
```

- 模态框
- 购物车(和登录框类似)
- vuex 和 redux 中的 store

## 总结

- 符合单一职责原则，只实例化唯一的对象。
- 没法具体开放封闭原则，但是不违反开发封闭原则。
