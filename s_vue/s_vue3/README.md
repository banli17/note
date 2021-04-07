# s_vue3

## Vue2 和 Vue3 对比

-   Vue2 采用 flow，Vue3 采用 ts，对 ts 支持更好
-   源码体积优化，移除部分 api，使用 tree-shaking
-   数据劫持优化：Vue3 使用 Proxy,性能提升
-   编译优化：Vue3 采用了静态模版分析，重写 diff 算法
-   CompositionAPI: 整合业务代码的逻辑，提取公共逻辑(vue2 采用 mixin，但是命名冲突，数据来源不清晰)
-   自定义渲染器，可以用来创建自定义的渲染器，改写 Vue 底层渲染逻辑
-   新增 Fragment，Teleport，Suspense 组件

## 项目

```
npm i vant@next
```
