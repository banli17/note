# Vue 总结

## Vue 是什么

Vue 是一个响应式渐进式框架。
解决问题 组件化 页面多时 状态管理 搭建环境麻烦
核心响应式 -> vue 组件化开发 -> vue-router -> vuex -> vue-cli

什么是库，什么是框架
jquery 为例：jq 包含很多方法，组成一个完整功能，通过这些功能完成业务功能 (主动调用库中的方法)
框架：我们只需将特定代码放在特定位置，框架会帮我们调用(被动)，即规定好模版后我们填写

mvc 和 mvvm 的区别
mvc 是后端开发 model 数据库中的数据 view 前端页面 controller 后端的控制器
整个过程是：用户操作界面 发送到后端的路由 后端的控制器 将数据获取到返回给页面

view mvvm 双向绑定
model (js 中的数据， viewmodel 视图模型 view 前端页面)
将数据挂在模型上，模型会进行页面显示
mvvm 模式 不需要用户手动操作 dom

vue 包里几个文件的区别？

- runtime : render()
- runtime with compiler: render() template 都行
- common
- common.dev

vue 渲染策略如下：
只限 runtime-with-compiler 版本。

```
if(hasRender){
    useRender() // 使用 render
}else if(hasTemplate){
    convertTemplateToRender() // 将 template 转为 render
}else{
    会使用外部模版，就是 el:'#app' 里的内容
    可以使用 {{msg}} 语法
}
```

`{{msg}}` 的执行结果会编译为 \_xxx(msg 的结果)，能放表达式，不能放 js 语法，因为会将返回值传递给函数。

响应式规则

- 会递归的去循环 vue 中的属性(浪费性能的地方),给每个属性添加 getter 和 setter。当属性变化时更新视图。
- 重写了数组的方法
- 对象只监听了默认属性，新增属性是不生效的。
- 数组索引值变化(数组中的引用类型可以，基础类型不行)、长度变化时不会更新

```
arr [ {a: 1}, 2]
vm.arr[0].a = 100  // ok
vm.arr[1] = 43     // fail

vm.$set(vm.arr, 0, 100) // 内部采用 splice 方法
vm.$delete(vm.arr, 0)
vue2 中的缺陷，vue3 通过 proxy 解决
```

proxy

vue 中的实例属性:

- vm.$el : `new Vue({el})`传入 el 后模版渲染出来的元素，会存在 vm.$el 上
- vm.$mount()// 如果不传递参数，表示要手动挂载，可以挂载到任何地方
- vm.$options: 传入组件的参数选项，包含用户传入和内置
- vm.$watch(key, handler) 批量更新只更新一次
- vm.$data = vm.\_data
- vm.$nextTick

## 指令

vue 中的指令都是 `v-`开头，指令一般是操作 dom 的封装

- `v-once`
- `v-html` 是 innerHTML，可能 xss 攻击，获取用户 cookie，会覆盖子元素
- `v-text`
- `v-if` `v-else-if` `v-else` 控制 dom 是否存在，可以阻止子节点逻辑
- `v-show` 不能用在 `<template></template>` 上, 控制样式 display:none
- `v-for="a in 3"` 这里 a 是值，或`a of 3`也可以

v-for 和 v-if 不要用在同一个元素上？
优先级是 v-for 大于 v-if。所以先走 for ，再走 if，存在一些性能问题，因为循环了还要判断 if。而不是先判断的 if。
会编译成

```
_l(3, function(x){
    return false ? _c(div, {}, x}
})
```

可以使用计算属性，先算了再循环。活着外面是 if。

```
<template v-if>
    <div v-for>
</template>

或者
<div v-for>
<template v-if>
</div>
```

key 不能加在 template 上，必须放在真实元素上。

- `v-bind` 可以简写为 `:`

动态绑定样式和 style 属性，可以放对象或数组。

事件绑定是直接给元素加 addEventListener，没有用事件代理，而且内部是原生事件。
指令修饰符： .stop 冒泡 .prevent 阻止默认行为 .self 只在 target 自己上触发 .once 只一次 .capture 捕获时触发
.passive 提高滚动事件的效率
$event，如果调用时添加()，需要手动传入事件源

.passive 作用
浏览器只有等内核线程执行到事件监听器对应的 JavaScript 代码时，才能知道内部是否会调用 preventDefault 函数来阻止事件的默认行为，所以浏览器本身是没有办法对这种场景进行优化的。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿。 这里一般用在滚动监听，@scoll，@touchmove 。因为滚动监听过程中，移动每个像素都会产生一次事件，每次都使用内核线程查询 prevent 会使滑动卡顿。我们通过 passive 将内核线程查询跳过，可以大大提升滑动的流畅度。
也就是快速滑动时，需要等每次查询是否阻止了默认行为，这样会造成卡顿。passive 告诉浏览器不用查询了，没有使用 preventDefault。

### v-model

v-model 双向绑定 语法糖
input textarea select radio checkbox
text :value @input
checkbox :checked @change

v-model.lazy 表示懒更新，离开焦点时更新
v-model.trim 去掉空格
.number 只能输入数字

### 计算属性和 watch

checkAll 例子，使用计算属性

watch 和 computed 的区别。

1. 底层都是 watcher
2. watch 是当数据变化时就会执行(deep 控制深度)，computed 只有依赖的值变化时才执行,否则会读取缓存(页面中多次使用计算属性时，如果值不变不会重新计算)。
3. 语义上

### 过滤器

过滤器是为了格式化数据显示，而不改变原数据。如时间格式、货币化。

熟悉下 moment.js dayjs 的基础用法

### 指令

指令是为了操作 dom。是以 v- 开头的。

### 生命周期

生命周期的顺序

- 初始化 vue 实例
- 初始化事件和生命周期
- beforeCreate
- 初始化数据，响应式
- created
- 如果有 el， 则编译模版，没有则不执行，除非手动调用 vm.$mount(el)
- 检查是否有 template，有则编译成 render，没有则直接用 el.outerHTML 作为模版
- beforeMount
- 使用 vm.$el 替换掉 el， 如 #app 被替换
- mounted
- 数据改变时，执行 beforeUpdate
- 虚拟 dom 重新渲染 re-render 和 patch
- updated 更新完成，这里不能修改数据，会死循环
- 调用 vm.$destroy() 时，触发 beforeDestroy (它只会移除 watcher 子组件和事件监听，不会删除 dom)
- destroyed

另外还有 3 个钩子：

- activated 被 keep-alive 缓存的组件激活时调用
- deactivated 被 keep-alive 缓存的组件停用时调用
- errorCaptured 2.5.0+新增，当捕获来自子孙组件的错误时调用
  - (err, vm, info) => ?boolean
  - 默认情况下，有了 config.errorHandler，errorCaptured 还是会执行
  - errorCaptured 里报错，这个错误和原先的错误都会发给全局
  - errorCaptured 返回 false，会阻止错误传播，全局也收不到

Vue.mixin 里的方法会被混入到组件方法的前面，做成一个数组依次执行。

```js
Vue.mixin({
  beforeCreate() {},
  methods: {
    fn() {},
  },
});
new Vue({
  // 内部会变成 [mixin里的beforeCreate, 这个beforeCreate]，组件初始化的时候执行
  beforeCreate() {},
});
```

### 动画

## 组件

- 组件有生命周期
- 组件有：全局和局部组件
- 可以抽离组件实现复用，方便代码维护
- 组件级别更新(减少更新)，给每个组件都添加 watcher
- 组件就是一个对象

### 组件基础使用

### 组件通信

```shell script
npm i @vue/cli -g

# 快速原型工具，可以直接解析 .vue 文件，方便做 demo 用
npm i @vue/cli-service-global -g
vue serve main.js # 默认main.js
vue serve App.vue
```

- 子组件不要修改 props，属性不是响应式的
- v-model 的语法糖是什么？同步数据用 v-model，.sync ，自定义 v-model ?
- provide inject 的使用，provider 直接暴露 this，会造成单向数据流混乱，常用于库中
- $parent $children 根据关系获取组件
- $dispatch 的实现，事件传播给父级，另外给父级加个 name，只某个父触发
- $broadcast 广播，可以通知子元素
- $attrs $listeners 会携带父级所有的属性，但是如果 props 里面用了某个属性，$attrs 里就没有了，默认情况下属性绑定在 dom 上，可以通过 `inheritsAttrs: false` 来取消属性绑在 dom 上。

```
v-bind="$attrs"
```

- ref 可以获取到组件 this.$refs
- 父子组件顺序：先加载父 - 渲染子组件 - 子 mounted - 父 mounted
- eventBus: 适合小规模通信，大规模不好维护，用 vuex

```
// Vue 实例上默认会有 $on $emit $off 方法
Vue.prototype.$bus = new Vue()

this.$bus.$on('xx', ()=>{})
this.$bus.$emit('xx')
```

### 插槽

- 匿名插槽
- 具名插槽
- 作用域插槽

新版和老版区别

### 表单组件

### 菜单组件

### v-lazyload 插件

## 弹窗组件

## render 方法使用

讲了封装 h1 h2 标签的 Level 组件：

- 直接用 .vue，麻烦
- 使用 render() 方法
  - 使用 h 方法
  - 使用 vue jsx 插件

## vuex

- vuex 单向数据流概念
- 简单使用方法
- strict 的作用，commit 里不能异步修改
- commit 的参数 action 的参数
- new Vuex.Store 的配置
  - state
  - getters
  - mutations
  - actions

```
npm i @vue/cli -g
vue create s_vuex
```

### 实现 vuex

**基础版**

1. 给所有实例添加 this.$store
   - applyMixin beforeCreate: 判断根实例，有 store 属性的就是根
2. 将 Store 里的 state 变为响应式并让其可以通过取得 $store.state.xx
3. computed 做缓存，getters 使用 Object.defineProperty 设置为能 get 属性读取，这里直接取 this.\_vm[key]，这个值会被 Vue 实例的 computed 直接挂载到 vm 上

同时修改 2 次 computed 属性里的依赖，computed 会重新计算吗？
this.a = 2
this.a = 3 // 本来就是 3

**升级版**

1. 转化数据格式
2. 模块安装：将 getters、mutations、actions 挂载到 Store 实例上

```
this._actions = {}
this._mutations = {}
this._wrappedGetters = {}
```

## vue-router

前端路由的 2 种方式

- hash : #/x，上线时不采用
  - `hashchange`
- history: 用于生产环境，需要服务器支持
  - `pushState({}, null, '/a')`，只是事件，前进后退没用
  - `replaceState`
  - popstate 监听前进后退时执行

```
window.addEventListener('popstate', ()=>{})
```

vue-router 的使用

1. 引入 use
2. new Router
3. 注入到实例

vue-router 会在全局挂载 2 个组件、2 个对象:

- `<router-link>`
- `<router-view>`: 组件会渲染到这里面
- this.$route
- this.$router

### 实现 vue-router

1. 将 router 对象挂载到根实例 \_router 上，给根组件和每个子组件挂载 \_routerRoot 指向根实例，这样所有组件都可以通过 \_routerRoot.\_router 拿到用户传递的 router 对象了。
2. createMatcher:
   - pathMap：
   - addRoutes 动态添加路由
   - match
3. createRouteMap: 将 router 转换数据格式为 `{path: route}` 形式
   - 返回: pathMap 遍历路由，将路径模块添加上去
   - addRouteRecord(route, pathMap)
4. 根据不同的路由切换
   - 根据 mode: hash | history 分别实例化 HashHistory 或 BrowserHistory
5. 设置当前的 route 信息 createRoute， `{path: '', params: '',matched:[]}` ，这里 matched 可能为多个，用于 router-view 的匹配渲染。
6. 第一次上来需要根据 hash 跳转， transitionTo ，并设置监听 hashchange 事件
7. transitionTo 时，需要更新当前的路由信息，并更新当前响应式数据 app.\_route = route

## vue 源码

### 搭建 rollup 环境

```
npm i rollup
rollup-plugin-babel
@babel/core
@babel/preset-env
rollup-plugin-serve
```

### 流程

**数据劫持**

- 建立框架
  - index.js
  - init.js
  - state.js
  - observer
    - index.js
- initMixin
  - initState
    - initProps
    - initMethods
    - initData: 将 data 挂载到 vm.\_data 上
    - initComputed
    - initWatch
- 将数据变为响应式
  - 需要递归，性能较差
  - 问题：新添加的属性或者用户修改了值为对象 就不是响应式的了
  - 响应式数据
    - 对象
    - 数组的方法
    - 数组里的对象
- 将 data 里的属性代理到 vm 上, proxy

**渲染的操作**

先找 render 再找 template 再找 outerHTML,
如何将 template 转为 render ? ast

挂载对象 el 或 $mount 等效

html -> render 函数

1. 将 html 转为 ast 语法树
2. 将 ast 转为 render 函数

ast 和 vnode 的区别

- ast 可以用来描述语法，html、js 等都可以，层面不一样
- vnode 是用对象来描述节点，主要作用是避免 dom 操作

```
{
    tag: 'div',
    parent: null,
    type: 1,
    children: []
    attrs:[],
}
```

vue 渲染流程

- 初始化数据
- 编译模版为 render
- 通过 render 生成 vnode
- 将 vnode 转为真实 dom，插入到页面

一个属性一个 dep

dep 和 watcher 是多对多的关系
dep(一个属性) 用于 属性变化时通知 watcher(组件) 更新
每个组件对应一个 watcher

对象有 dep
属性有 dep
数组也有 dep

- 取 arr 的值时，会调用 get 方法，这时希望当前数组记住这个渲染 watcher
- 给所有 Observer 对象类型添加 dep 属性
- 通过在 push 等方法里找到对应 dep 的 watcher 来更新

树的对比树 O(n^3)，只对比同层 O(n)

dom diff

- 同级别
  - tag 不一样
  - tag 一样
    - 文本节点：文本不一样
    - 属性不一样
- 比较儿子

计算属性取值时会执行，就是一个 getter，也是 Object.defineProperty，
里面有个遍历 dirty 控制要不要执行。
computed 变化时，它会触发页面更新，所以也是一个 watcher，内部依赖的属性会收集这个 watcher
computed 的两种写法：

```
computed:{
    fullName(){},
    fullName:{
        get(){},
        set(){},
    }
}
```

为什么要拆分小组件？

- 可组合
- 复用
- 方便维护
- 性能(减少比对)：每个组件都是一个 watcher，更新时，需要对比一遍 vnode，小组件对比速度更快

Vue.extend 作用

- 拿到配置后，创建一个 Vue 的子类，当 new SubVue 时，创建实例并可以手动挂载到想挂载的地方。
- 组件内部会变成 Vue.extend， 子类会调用父类的 \_init()

```
Vue.extend('my-button', {}) -> Vue.extend
```

组件的渲染流程：

- 调用 Vue.component
- 内部使用 Vue.extend 产生子类
- 创建子类实例时，会调用父类的\_init，再$mount
- 创建虚拟节点，并根据组件标签，生成组件虚拟节点 componentOptions children
- 创建组件真实 dom，(先渲染的是父组件)
