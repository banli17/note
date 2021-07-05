---
title: "javascript 桥接模式"
sidebar_label: 桥接模式
---


桥接模式(Bridge) 是将抽象部分与它的实现部分解耦，使它们独立变化。

它的一个典型应用场景是事件监听。

```javascript
li.addEventListener('click', getUserInfoBridge, false)

function getUserInfoBridge(event){
    getUserInfo(event.target.dataset.id, (data)=>{
        console.log('得到用户信息', data)
    })
}

function getUserInfo(id, callback){
    ajax.get(`/user/${id}`, (data)=>{
        callback && callback(data)
    })
}
```

上面`getUserInfoBridge()`方法作为桥将监听和处理函数解耦，让`getUserInfo()`方法更加通用。

桥接模式和适配器模式的区别

适配器模式是 A 不能使用 B，所以用适配器模式将 B 包装后给 A 使用。桥接模式是 A、B 能正常使用，但是为了让 A、B 解耦，所以用 C 将 A、B 分开。让 A、B 更加通用。
