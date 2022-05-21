# Vue 基础

## Vue 基础结构

```js
new Vue({
  data() {
    return {};
  },
  render(h) {
    return h("div", {}, "hello");
  },
}).$mount("#app");
```

## 生命周期

1. new Vue() 创建实例
2. 初始化 事和生命周期
3. beforeCreate
4. 初始化, 注入props(并校验), data, methods
5. create
6. 有 el，看是否有 template, 没有 el 就在 vm.$mount(el) 时查看是否有 template
7. 有 template 就编译为 render, 没有就将 el 外部的 html 作为 template 编译
8. beforeMount
9. 创建 vm.$el 并替换 el
10. mounted
11. 挂载完毕, data 修改时虚拟dom会重新渲染，并 updated
12. vm.$destroy() 时 beforeDestroy()
13. 然后解除绑定，销毁子组件和事件监听器
14. 销毁完毕, 执行 destroyed

如果使用构造生成文件，模版编译将提前执行。

## 语法和概念

- 差值表达式
- 指令
- 计算属性和监听器
- Class 和 Style 绑定
- 条件渲染/列表渲染
- 表单输入绑定
- 组件
- 插槽
- 插件
- 混入 mixin
- 深入响应式原理
- 不同版本的 vue
## 版本
Vue 的构建版本
runtime-only: 不支持 template，需要打包时提前编译。
完整版： 包含运行时和编译器，体积大 10k，会将模版转为 render 函数。

解决方法

1. vue.config.js

runtimeCompiler: false // 默认不带编译器

2. 使用 render(h) 函数
