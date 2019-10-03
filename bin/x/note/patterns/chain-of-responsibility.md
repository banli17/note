---
title: "javascript 职责链模式"
sidebar_label: 职责链模式
---

在职责链模式(chain-of-responsibility)里，有很多函数节点组成了一条链，数据传递给第一个函数处理，如果失败则抛给第二个函数，直到某个函数节点成功处理该数据为止。

```javascript
function processType(type){
    if(type == 1){
        //...大量代码
        return 
    }
    if(type == 2){
        //...大量代码
        return 
    }
    if(type == 3){
        //...大量代码
        return 
    }
    // 兜底
}
```

上面这段代码会造成函数太长难以维护，当然其中的大量代码可以使用一些函数抽取出来，但是当需要新增了`type == 4`，就需要去修改 processType 函数，违反了开闭原则。

职责链模式就可以来优化这段代码。我们可以在`type==1`处理完成后，再对`type==2`处理，再对`type==3`处理。


```javascript
class Action {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }

    setNextAction(action) {
        this.nextAction = action
    }

    handle() {
        console.log(`${this.name}审批`)
        if(this.nextAction != null){
            this.nextAction.handle()
        }
    }
}
let a = new Action('组长')
let b = new Action('总监')
let c = new Action('老总')
a.setNextAction(b)
b.setNextAction(c)
a.handle()
```

