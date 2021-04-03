---
title: "备忘录模式"
---

# 备忘录模式

## 概念

本质上，备忘录(mementos)是一个存储对象状态的小型存储库，你可能希望对象还原到以前存在的状态。在需要对象快照时使用，比如游戏中玩家的状态或在数据库中实现撤销操作，或 ctrl+z 撤销功能。

![](./imgs/2020-03-29-12-14-15.png)

-   Originator(发起者): 对象
-   Memento: 负责保存对象的状态(生成一条记录)，或者从记录恢复对象状态
-   CareTaker: 负责存取备忘录记录，相当于存储库

## javascript 示例

在 javascript 中，备忘录模式使用频率低。可以使用 JSON 的序列化和反序列化来轻松实现备忘录。

比如张三改名为张四，后来要恢复成张三。

```js
// 备忘类
class Memento {
    // 生成备忘录记录
    store() {
        return JSON.stringify(this);
    }
    // 根据备忘录记录恢复对象
    restore(record) {
        let s = JSON.parse(record);
        Object.assign(this, s);
    }
}

class Person extends Memento {
    constructor(name) {
        super();
        this.name = name;
    }
    rename(name) {
        this.name = name;
    }
}

// 备忘数据库
class CareTaker {
    constructor() {
        this.values = [];
    }
    // 往数据库添加记录
    add(memento) {
        this.values.push(memento);
    }
    // 从数据库取出记录
    get(i) {
        return this.values[i];
    }
}

const careTaker = new CareTaker();
const p = new Person("张三");

careTaker.add(person.store());
person.rename("张四"); // 改名了
careTaker.add(person.store());
console.log(careTaker); // CareTaker { values: [ '{"name":"张三"}', '{"name":"李四"}' ] }

// 恢复曾用名
person.restore(careTaker.get(0));
console.log(person); // Person { name: '张三' }
```
