---
title: vue 原理分析
sidebar_label: 原理分析
---

## 响应式原理

### defineProperty

`Object.defineProperty(obj, property, 描述符对象)`用来定义对象的属性描述符。属性描述符分为数据描述符、存取描述符。

数据描述符：

- `configurable`: 为 false 时，属性描述符不能被改变，属性不能被删除，默认值为 false。
- `enumerable`: 属性是否可以枚举，默认值为 false。
- `value`: 属性的值，默认为 undefined。
- `writable`: 属性值是否可修改，默认为 false。

存取描述符：

- `configurable`: 为 false 时，属性描述符不能被改变，属性不能被删除，默认值为 false。
- `enumerable`: 属性是否可以枚举，默认值为 false。
- `get()`: 读取属性时，会执行这个函数。
- `set()`: 设置属性值时，会执行这个函数。

属性描述符只能是两者之一，不能同时交叉使用，比如不能同时设置存取描述符 get() 和 数据描述符 value。

通过`defineProperty()`方法，可以监听在读取属性或设置属性值时，做一些自定义事情。

```js
let o = {
    name: 'zs',
    child: {
        name: 'lisi'
    }
}

function watch(obj, property, func){
  var value = obj[property]
  Object.defineProperty(obj, property, {
    get(){
      return value
    },
    set(newValue){
      value = newValue
      func(value)
    }
  })

  // 第一次时，触发一次 setter，即触发一次 func
  if(value) obj[property] = value
}

watch(o, 'name', function(val){
  console.log('o name changed to:', val)
})
```

上面代码，可以监听`o.name`属性的变化，但是`o.child.name`修改时，不会执行`setter`方法，需要递归进行处理。

### Proxy

使用`defineProperty()`方法只能监听属性的读取、设置。ES6 新增了 Proxy，用来代理对象，它相当于是个拦截器，在操作原对象时，会被它拦截，它可以拦截 13 种操作。

```js
let o = {
    name: 'zs',
    child: {
        name: 'lisi'
    }
}

let handler = {
    get(target, property) {
        if (typeof target[property] === 'object' && target[property] !== null) {
            return new Proxy(target[property], handler)
        }
        return Reflect.get(target, property)
    },
    set(target, property, value) {
        console.log('设置了属性:', value)
        target[property] = value
    }
}

let n = new Proxy(o, handler)

n.child.name = 'ww'
console.log(o)
```

上面代码，通过 new Proxy 可以很方便的给对象 o 深层的对象也添加监听。

