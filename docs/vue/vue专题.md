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
