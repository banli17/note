---
title: "javascript 单例模式"
sidebar_label: 单例模式
---

单例模式就是一个类只有一个实例。比如整个网站的登陆弹出框，系统window对象等。

实现

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
})()

let o1 = SingleObject.getInstance()
let o2 = SingleObject.getInstance()
o1 == o2  // true

// 但是还是可以new SingleObject
let o3 = new SingleObject()
```

实例

比如现在需要实现一个登陆弹出框。

```javascript
class LoginForm{
    show(){}
    hide(){}
}

LoginForm.getInstance = (function(){
    let instance = null
    return function(){
        if(!instance){
            instance = new LoginForm()
        }
        return instance
    }
})()
```

显然，可以将 getInstance 抽出来，因为其他组件也可能是单例，比如遮罩。

```javascript
class LoginForm {
    show() { }
    hide() { }
}

class Singleton { }
Singleton.getInstance = function (fn) {
    let instance = null
    return function () {
        return instance || (instance = fn.apply(this, arguments))
    }
}

let createLogin = Singleton.getInstance(function () {
    return new LoginForm()
})

let login1 = createLogin()
let login2 = createLogin()

class Mask { }
let createMask = Singleton.getInstance(function () {
    return new Mask()
})

let mask1 = createMask()
let mask2 = createMask()

console.log(login1 === login2)  // true
console.log(mask1 === mask2)    // true
console.log(login1 === mask1)   // false
```

看上面代码，单例就是获取实例的时候总是那个实例。

总结

- 符合单一职责原则，只实例化唯一的对象。
- 没法具体开放封闭原则，但是不违反开发封闭原则。
