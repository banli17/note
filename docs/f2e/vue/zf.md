---
title: vue 知识点
sidebar_label: 知识点
---

```
npm i @vue/cli -g
npm i @vue/cli-service-global -g
```

新建一个项目执行：`vue serve`

## 组件数据传递

- :value.sync  是 :value 和 @update:value 的语法糖
- v-model  是 :value @input 的语法糖
- v-model 只能是 value， :value.sync 里的 value 可以是其它名称

dispatch broadcast

$attrs v-bind
$listeners  v-on

provide  inject  库中可以用

ref   this.refs.

子获取父
父获取子
跨层级

eventBus 定义在全局上的发布订阅模式

```
Vue.prototype.$bus = new Vue()  // 实例上就有 on emit
```

on  emit

this.$nextTick()

## jsx

函数式组件

```js
export default {
    props:{
        t:{}
    },
    render(h){  // createElement
        let tag = 'h' + t
        return <tag>{this.$slots.default}</tag>

        h('h1', {
            on:{
                click(){}
            },
            attrs:{
                a: 1
            }
        })
    }
}
```


和 react-native 一样的 render

```
<List :data="" :render="render"></List>
```

element-ui scope-slot 作用域插槽



## JWT 认证
json web token

