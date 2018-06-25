# Zepto dom 源码阅读(二)

> 本系列文章基于 Zepto 1.2.0 源码

## 资料

*   [http://jquery.cuishifeng.cn/](http://jquery.cuishifeng.cn/)
*   [http://www.css88.com/doc/zeptojs_api](http://www.css88.com/doc/zeptojs_api/)

## 学习任务

上一节学习了文档操作的 8 个方法，这一节主要学习剩下的几个方法。

*   unwrap()
*   wrap()
*   wrapAll()
*   wrapInner()
*   replaceWith()
*   empty()
*   remove()
*   clone()

## unwrap()、wrap()、wrapAll()、wrapInner()

unwrap()、wrap()、wrapAll()、wrapInner() 这四个方法都挂载在 $.fn 下面，代码在 769 - 810 行。

首先自己实现一下代码，思路如下：
- unwrap() 将父节点替换为自身
- wrap() 将原节点替换为一个新节点，这个新节点 append 了原来的节点
- wrapAll() 和 wrap 相同，只是选中的元素有多个
- wrapInner() 将子元素包裹起来

接下来看 Zepto 的源码。

```javascript
$.fn = {
    ...
    wrap: function(structure) {
        // 参数有可能是一个函数
        var func = isFunction(structure)

        // 如果不是函数
        if (this[0] && !func)
            var dom = $(structure).get(0),
                clone = dom.parentNode || this.length > 1

        // 对每个元素都进行 wrap
        return this.each(function(index) {
            $(this).wrapAll(
                func
                    ? structure.call(this, index)
                    : clone
                        ? dom.cloneNode(true)
                        : dom
            )
        })
    },
    wrapAll: function(structure) {
        if (this[0]) {
            $(this[0]).before((structure = $(structure)))
            var children
            // drill down to the inmost element
            while ((children = structure.children()).length)
                structure = children.first()
            $(structure).append(this)
        }
        return this
    },
    wrapInner: function(structure) {
        var func = isFunction(structure)
        return this.each(function(index) {
            var self = $(this),
                contents = self.contents(),
                dom = func ? structure.call(this, index) : structure
            contents.length ? contents.wrapAll(dom) : self.append(dom)
        })
    },
    unwrap: function() {
        this.parent().each(function() {
            $(this).replaceWith($(this).children())
        })
        return this
    },
}
```

## replaceWith()

只有三行代码，在 766 - 768 行。思路是将 newContent 放在 this 前面，然后再将 this 移除掉。

```
$.fn = {
    ...
    replaceWith: function(newContent) {
        return this.before(newContent).remove() 
    }
}
```

## empty()、remove()

remove() 和 empty() 的实现很简单。

```
$.fn = {
    ...
    // 598 - 603 行
    // 通过 parentNode.removeChild(childNode) 实现
    remove: function() {
        return this.each(function() {
            if (this.parentNode != null)
                this.parentNode.removeChild(this)
        })
    }
    ...
    // 744 - 748 行
    // 直接设置 innerHTML = ''
    empty: function() {
        return this.each(function() {
            this.innerHTML = ""
        })
    },
}
```

## clone()

clone() 方法也十分简单，直接调用原生的 Node.cloneNode() 实现。

```
$.fn = {
    ...
    // 811 - 815行
    clone: function() {
        return this.map(function() {
            return this.cloneNode(true)
        })
    },
}
```