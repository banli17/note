# jQuery源码分析笔记

## 整体架构

### 无 new 创建
jQuery 采用无 new 创建，让用户不需要 new，直接通过`$()`调用。可见`$()`返回了一个对象。

jQuery 内部是

```js
var jQuery = function (selector, context){
    return new jQuery.prototype.init(selector, context)
}

jQuery.prototype = {
    init: function(){
        // 如果使用下面代码，调用 jQuery() 时，会修改jQuery.prototype.name属性为12.
        // jQuery.prototype.init(selector, context)
        // this.name = 12
        // return this
    },
    name(){
        return 13
    }
}

jQuery.prototype.init.prototype = jQuery.prototype
```

让`jQuery.prototype.init`的原型指向`jQuery.prototype`，new 创建的实例 的 __proto__ 属性就是 jQuery.prototype。所以`jQuery()`创建的对象可以使用`jQuery.prototype`上的方法。

要将 init 的作用域 和 jQuery.prototype 分开，init 是一个对象，jQuery.prototype 是另外一个对象。

### 链式调用

通过返回 this

```js
jQuery.prototype = {
    name(){
        return this
    },
    age(){
        return this
    }
}
jQuery().name().age(0)
// jQuery().name()  返回的 this 是 new init()。它的原型就是 jQuery.prototype ，所以可以继续调用 age()
```

好处是节省代码量，提高代码效率，看起来优雅(个人不觉得，如果多了，反而很混乱)

### 插件接口

让开发者可以自定义扩展，可以在 jQuery(工具方法) 和 jQuery.prototype(实例方法) 上添加方法。

```js
jQuery.fn = jQuery.prototype

jQuery.extend = jQuery.fn.extend = function(){}

// 使用
$.extend({xx})  // 添加到jQuery上
$.xx()

$.fn.extend({xx})  // 添加到jQuery.prototype上
$().xx()
```

调用 extend 时:

1. 如果是 jQuery，则 this 是 jQuery
2. 如果是 jQuery.fn，则 this 是 jQuery.prototype


### extend() 源码实现


## 选择器

```
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
```

上面正则匹配：

1. `^(?:\s*(<[\w\W]+>)[^>]*$`或者`^#([\w-]*)$`


### 选择器接口

$() 支持 9 种格式：

```js
$(document)  // 将DOM转jquery对象
$(function(){})
$('<div>')  // 生成jquery对象
$('div')    // 转jquery对象
$('#test')
$('input:radio', document.forms[0])
$('input', $('div'))
$()
$('<div>', {
    class: 'test',
    text:'click me',
    click: function(){
        $(this).toggleClass('test')
    }
}).appendTo('body')
$($('div'))
```

## 遍历 DOM 元素

```js
// 获取父元素
parent()
// 获取父元素和祖先元素
parents(selector)
eq(index)
siblings()
children()
find()
```

append appendTo
prepend prependTo
after insertAfter
before insertBefore

删除 
- empty()  
- remove()

return false  阻止事件冒泡和默认事件

## 选择器

```js
// 基本选择器 
$(tag)
$(#id)
$(.class)
$(*)
// 组合选择器
$(selector1, selector2)
$(selector1 selector2)
$(selector1 > selector2)
$(selector1 + selector2)
// 其它
$(selector:first-child)
$(selector:last-child)
$(selector:eq(index))
$(attribute=value)
```

## ready 事件

## each

### 隐式迭代

给一类元素添加样式时，原生 js 需要循环设置，jQuery 对选中的元素进行了隐式迭代，会对所有匹配的元素进行循环遍历，执行相应的方法。

- each
- $.each(obj, callback) : 用来遍历数组和对象




