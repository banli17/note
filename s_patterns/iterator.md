---
title: "javascript 迭代器模式"
sidebar_label: 迭代器模式
---



迭代器模式是将数组、类数组等数据格式的遍历封装在一个方法中。

```javascript
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        return this.index < this.list.length
    }
}

class Container {
    constructor(list) {
        this.list = list
    }
    getInterator() {
        return new Iterator(this)
    }
}
let container = new Container([1, 4, 2, 19, 22])
let it = container.getInterator()

while (it.hasNext()) {
    let n = it.next()
    console.log(n)
}
```

## es6 Iterator

es6中，有序集合的数据类型已经有很多了，如Array,Map,Set,String,TypedArray,arguments,NodeList等。

它们都内置了[Symbol.iterator]方法，这个方法会返回迭代器，执行`for...of`方法时会自动执行这个迭代器。

```javascript
function each(data, callback) {
    let it = data[Symbol.iterator]()

    let isDone = false
    while (!isDone) {
        let { value, done } = it.next()
        !done && callback.call(data, value)
        isDone = done
    }
}

each([1, 3, 4, 9], function (item) {
    console.log(item)
})
```

因为语法糖`for...of`就会执行对象的迭代器方法，所以可以将上面的方法简化为：

```javascript
function each(data, callback) {
	for(let item of data){
		callback.call(data, item)
	}
}
```

- 迭代器对象和目标对象分离。
- 迭代器将使用者与目标对象分离，不关心对象类型。
- 符合开放封闭原则。

