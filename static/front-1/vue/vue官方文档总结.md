# 总结














## 过渡和动画

vue在插入、更新、删除dom元素的时候，

vue的`transition`组件能提供动画效果，比如

```
<transition name="fade">
    <p  v-if="show">hello</p>
</transition>
```

如果transition有属性name，它会在v-if显示的时候，增加class: `.fade-enter-active`和`.fade-enter-to`。在v-if删除的时候，增加`.fade-leave-active`和`.fade-leave-to`。

所以可以通过它们来控制过渡：

```
.fade-enter-active, .fade-leave-active{
    transition: opacity 1s
}
.fade-enter-to, .fade-leave-to{
    opacity: 0
}
```
