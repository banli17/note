---
title: 文档阅读总结
---

# vue 文档阅读笔记

class 和 style

-   使用动态属性
-   使用驼峰写法

## 条件渲染

```
v-if
v-else-if
v-else
v-show
```

v-if 更新不频繁
v-show 更新频繁

## 循环列表

-   如何遍历对象 也可以 v-for
-   key 的重要性
-   v-for 和 v-if 不能一起使用, v-for 循环， 会多次 v-if 计算，可以将 v-if 放到外层

```
v-for = (item, index) in arr
v-for = (val, key,index) in obj
```

事件
event 参数、自定义参数

```
@click='add' 会自动传过去
add(event){
    event.__proto__.constructor // 是原生的事件对象
    event.target   // 当前元素
    event.currentTarget // 事件被注册到当前元素
}
@click='add(2, $event)' 最后一个参数
```

事件修饰符、按键修饰符
.stop
.prevent
submit.prevent
.capture
.self
.ctrl
.ctrl.exact
.exact 没有任何按键修饰符
观察事件被绑定到哪里？

表单
v-model
常见表单项 textarea checkbox radio select
修饰符 lazy number trim

```
<input type='text' v-model.trim="name">
<input type='text' v-model.lazy="name">
<input type='text' v-model.number="name">

<textarea v-model='desc'></textarea>
// 不能像正常 <textarea>hello</textarea>

v-model

select v-model='select'
select multiple  v-model='selectList'
```

vue 组件使用
`props` `$emit`

```
props: ['list']
props: {
    list: {
        type: Array,
        default(){
            return []
        }
    }
}

// 父子组件通信 props $emit
<Input @add='add' />

Input 组件里 可以 this.emit('add', params) 调用父组件的事件

del: 删除 todolist
this.list = this.list.filter(x=>x.id!=id)
```

组件间通讯 - 自定义事件
组件生命周期

兄弟组件通信

```
event = new Vue()
// 在其它地方都可以
event.$on('addx', this.add)
event.$emit('addx',params) 调用自身组件的 自定义事件

beforeDestroy  及时销毁，防止内存泄露
event.$off('addx', this.add)
```

生命周期  
beforeDestroy 做什么事情
父子组件生命周期调用顺序
