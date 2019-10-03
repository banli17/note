---
title: "javascript 状态模式"
sidebar_label: 状态模式
---


- 一个对象有状态变化，比如交通灯、收藏按钮。
- 每个状态变化都会触发一个逻辑
- 不能总是用if...else来控制

```javascript
class State {
    constructor(color) {
        this.color = color
    }
    // 状态改变时调用
    handler(context) {
        context.setState(this)
    }
}

class Context {
    constructor() {
        this.state = null
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
    }
}

let yellow = new State('yellow')
let red = new State('red')
let green = new State('green')
let context = new Context()  // 实体

yellow.handler(context)
console.log(context.getState())

red.handler(context)
console.log(context.getState())

green.handler(context)
console.log(context.getState())
```

有限状态机(收藏和取消收藏)

javascript-state-machine

设计原则验证

- 将状态对象和主题对象分离，状态变化逻辑单独处理
- 符合开发封闭原则
