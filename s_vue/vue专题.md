# vue 专题

简史
13.7.28 最新名为 Element，后 改名 Seed.js
14.2.1 Vue.js 0.6.0
15.10.26 vue1.0.0

Vue(读音 view) 是一个构建数据驱动的 web 界面的渐进式框架。
框架和库
渐进式：自上而下，全家桶(Vue + Vue-router + vuex + axios)，可选择添加
数据驱动

vue 开发和传统开发的对比
vue 开发

-   数据驱动 UI 视图，只需管理数据
-   使用 v-if 等指令完成 DOm 操作
-   methods 中定义点击事件，元素中绑定事件
    优点：视图数据解开耦合，指令化操作，利于维护

传统开发

-   定义变量判断 DOM 是否存在
-   使用 jq 2 次操作 DOM
-   给创建好的元素绑定事件
    缺点：视图、数据糅合、频繁操作 DOM，难维护

```
npm i @vue/cli
vue create xx
```

模版语法

文本（变量）插值

-   Mustache 语法(双打括号), html 内容会原样输出
-   v-once 只绑定一次
-   属性 v-bind:id 简写为:id
-   v-html: 要防止 xss 攻击

```
<div>{{title}}</div>
<div v-once>{{title}}</div>
<div :id="id">{{title}}</div>

修改值
vm.$data.title = 'hello'
```

使用 js 表达式

```
{{number + 1}}
{{ show ? 'show' : 'hide'}}
```

内置指令
指令是什么？
v-cloak vue 结束编译时从 html 元素上移除
v-if v-else-if v-else
v-show
v-on
v-bind
v-for
v-model

事件绑定

```
@click='say("hello", $event)'
```

## 指令、插值

-   插值、表达式
-   指令、动态属性 (:id='x')
-   v-html：会有 xss 风险，会覆盖子组件

## computed 和 watch

-   computed
    -   包含 getter 和 setter
    -   基于依赖有缓存
    -   依赖数据改变 -> 出发 getter 和 setter -> 计算属性改变
    -   可以依赖其它计算属性
    -   可以依赖实例属性
-   methods 方法： 本质是实例上定义的普通函数，组件重新渲染就会调用
-   watch，的属性会挂载到 vm 实例上
    -   newValue, oldValue
    -   如何深度监听 deep、handler， immediate 是否以初始化值
-   watch 监听引用类型，拿不到 oldValue，因为引用类型修改后，原来的值已经覆盖了，同一个地址

看是否要缓存，如果有遍历大数组和做大量计算，就用 computed，如果要总是刷新就用 methods。

v-model computed 要 get 和 set

```
v-model="a"
computed:{
    a:{
        get(){},
        set(){}
    }
}
```

## 条件渲染

`v-if v-else-if v-else/v-show`

v-if 对应的是 DOM 中的渲染和销毁组件
使用场景: 运行条件较少改变、展示带权限列表、可以在 template 上使用
v-show 不管初始条件是什么，元素都会被渲染，并且只是简单的基于 CSS 进行显示隐藏切换。
使用场景: 需要频繁切换（tab 切换），展示前台页面数据，不可以在 template 上使用

v-for

```
// 渲染数组
v-for="(item, index) in items"
v-for="(item, index) of items"

// 渲染对象，是按照 Object.keys 遍历的
v-for="(value) in items"
v-for="(value, key, index) in items"
```

维护状态 key
数组 unshift 时会全部重新渲染，通过 key 解决,key=index 还是会重新渲染
用于跟踪每个节点，从而重用和重新排序现有元素。

数组更新检测

1. push pop shift unshift splice sort reverse
2. 当使用非变异方法时，可以用新数组替换旧数组，方法有：filter concat slice
3. 两种情况不能监听，1.直接修改数组某一项，2.修改数组长度。

显示过滤/排序的结果：可以创建一个计算属性 filter 或 sort

template 上使用 v-for

```
<ul>
    <template v-for='item in items'>
        <li></li>
    </template>
</ul>
```

注意

-   不推荐同时使用 v-for 和 v-if: v-for 比 v-if 优先级高，渲染出来后再 if 删除 会影响性能
-   列表渲染给每项加个 key

## 表单处理

v-model 中文输入法，还没有选择某个词时，是不会更新数据的，如果要实时，用 @input
@change 是光标移除才触发
@input 是实时的

```
input v-model
textarea v-model
```

v-model 修饰符

```
v-model.lazy   从 input 事件转变为 change 事件同步数据
v-model.number 将输入转换为 Number 类型
v-model.trim   自动过滤首位空格
```

v-bind

## slot

-   普通插槽
-   具名插槽
-   作用于插槽

```js
<template>
    <div>
        <child-component>
            <p slot="header">有数据时显示 header</p>
            <p>有数据时显示</p>
            <template scope="props">
                <div>{{props.msg}}</div>
            </template>
        </child-component>
    </div>
</template>

Vue.component('child-component', {
    template: `<div>
        <slot name="header"><p>没有 header 数据时显示</p></slot>
        <slot msg="hello"><p>没有内容时显示</p></slot>
    </div>`
})
```
