# vue 基础总结

## 自定义事件

### .sync 修饰符

.sync 修饰符是一种语法糖。

```html
<Component
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></Component>

<!-- .sync -->
<Component v-bind:title.sync="doc.title"></Component>

<!-- 也可以传递一个对象，相当于循环绑定属性和事件 -->
<Component v-bind.sync="doc"></Component>
```

当组件内部触发`$emit("update:title")`时，就会触发外面的 title 进行更新。

注意：

1. `.sync`不能和表达式一起使用，如`v-bind:title.sync=”doc.title + ‘!’”` 是无效的。
2. `.sync`不能用于字面量的对象，如`v-bind.sync=”{ title: doc.title }”`。

## vuex

### 为什么有 vuex?

多个组件共享状态，或多个组件会去更新同一个状态，项目大了之后，如果采用组件之间通信，很难维护。所以需要把数据层和组件层分开。将数据放在一个 store 里面进行管理。组件层变得更薄，专门用来进行数据的展示和操作。

所有的数据变更都需要通过 store 来进行，形成一个单向数据流，使数据变化可预测。

store 是一个单例。而且是使用了 Vue 内部的响应式机制。优点是更加简洁高效，缺点是只能和 vue.js 搭配使用。

vuex 实现了一个单向数据流，全局有一个 state 存放数据，所有的修改都需要通过 mutation 进行。mutation 同时提供了订阅者模式，供外部插件获取 state 数据的更新。所有异步接口都需要走 action，action 不能直接修改 state，需要通过 mutation。最后根据 state 的变化，渲染到视图上。vuex 运行依赖 vue 内部数据的响应式机制，需要 new Vue 来实现。所以只能 vue.js 使用。
