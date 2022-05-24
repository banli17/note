# vue-router 原理实现

## 基础使用

```js
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    ...
  ]
})

new Vue({
  router
})
```

## vue-router 做了什么

- 在所有实例上挂载了 this.$router、this.$route 两个属性
- 注册了两个全局组件 router-view、router-link
- 支持 history 和 hash 模式
- 路由变化时，将 router-view 替换为当前路由对应的组件

## uml 类图

![](./imgs/2022-05-08-20-51-55.png)

## Vue 的构建版本

runtime-only: 不支持 template，需要打包时提前编译。
完整版： 包含运行时和编译器，体积大 10k，会将模版转为 render 函数。

解决方法

1. vue.config.js

runtimeCompiler: false // 默认不带编译器

2. 使用 render(h) 函数

## vue-router 实现

- [代码](./src/plugins/vue-router.js)

## vue-router 源码分析
