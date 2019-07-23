---
        title: 无名
        ---
        # Zepto dom 源码阅读(一)

> 本系列文章基于 Zepto 1.2.0 源码

## 资料

*   [http://jquery.cuishifeng.cn/](http://jquery.cuishifeng.cn/)
*   [http://www.css88.com/doc/zeptojs_api](http://www.css88.com/doc/zeptojs_api/)

## dom 操作总览

zepto 中关于 dom 操作的方法分类如下：

1.  dom 节点的增加、删除、替换、查找。比如 append()、after()、find()等
2.  css 的操作，比如 css()、addClass()、hasClass()等

## 学习任务

这一节主要学习 zepto 的 1200 - 1293 行代码。实现了下面 8 个节点插入方法。

*   append()
*   appendTo()
*   prepend()
*   prependTo()
*   after()
*   before()
*   insertAfter()
*   insertBefore()

## 自己编写代码的思考

在学习源码之前，自己也尝试实现了这些方法，但是实现的很简单，有几个问题感觉比较麻烦，有些疑惑，所以没有解决。但是看完 zepto 的代码，这些疑惑都迎刃而解了。

拿 append() 来说：

1.  比如 `$(a).append( $(b) )`，$(a) 和 $(b) 有多个该怎么处理？比如 $(a) 有多个，而$(b) 只有一个，是应该克隆多个 $(b) 后往 $(a) 里面各插入一个，还是只在 $(a)[0] 里面插入一个。
2.  append( 的参数可以是 html 字符串(`'<div>hi</div>'`)、node 节点、node 数组、Zepto dom 对象($(b))。可能性太多，上面 8 个方法都是一样，不可能去写重复代码，所以该怎么封装一下？

上面 8 个方法对应的原生方法有下面几个：

*   Node.appendChild()
*   Node.insertBefore()
*   ParentNode.append()
*   ParentNode.prepend()
*   ChildNode.before()
*   ChildNode.after()

## 源码阅读

```javascript
// 首先将8个方法按照操作对象进行分组为 adjacencyOperators 和 非adjacencyOperator
// adjacencyOperators 的操作对象都是前面的对象 a，比如 a.after(b)、a.prepend(b)等
// 非adjacencyOperators 的操作对象都是前面的对象 b
var adjacencyOperators = ["after", "prepend", "before", "append"]

// 遍历处理一个节点及其子节点
function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
        traverseNode(node.childNodes[i], fun)
}

// 生成 `after`, `prepend`, `before`, `append`方法,并同时生成对应的方法
// 用 after 生成 insertAfter
// 用 prepend 生成 prependTo
// 用 before 生成 insertBefore
// 用 append 生成 appendTo
adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> 选中 prepend, append

    $.fn[operator] = function() {
        var argType,
            // 统一处理 nodes，可能是 ndoes、nodes array、zepto object 和 html strings
            nodes = $.map(arguments, function(arg) {
                var arr = []
                argType = type(arg)
                // nodes array，可能有几种形式同时存在
                if (argType == "array") {
                    arg.forEach(function(el) {
                        if (el.nodeType !== undefined) {
                            // 原生dom
                            return arr.push(el)
                        } else if ($.zepto.isZ(el)) {
                            // zepto object
                            return (arr = arr.concat(el.get()))
                        } else {
                            // html strings
                            arr = arr.concat(zepto.fragment(el))
                        }
                    })
                    return arr
                }
                return argType == "object" || arg == null
                    ? arg // nodes 或 zepto object
                    : zepto.fragment(arg) // 处理html strings
            }),
            parent,
            copyByClone = this.length > 1

        // 如果参数节点为空，即 $(a).append($(b))  b为空
        if (nodes.length < 1) return this

        return this.each(function(_, target) {
            parent = inside ? target : target.parentNode

            // 将所有的方法都转成用 parentNode.insertBefore(node, target) 的方式来操作
            // a.after(b) -> a.parentNode.insertBefore(node, a.nextSibling)
            // a.before(b) -> a.parentNode.insertBefore(node, a)
            // a.prepend(b) -> a.insertBefore(node, a.firstChild)
            // a.append(b) -> a.insertBefore(node, null)  第二个参数null会插入到最后
            target =
                operatorIndex == 0 // after
                    ? target.nextSibling
                    : operatorIndex == 1 // prepend
                        ? target.firstChild
                        : operatorIndex == 2 // before
                            ? target
                            : null

            var parentInDocument = $.contains(document.documentElement, parent)

            // 比如 $(a).append($(b),$(c))， nodes 就是 [$(b),$(c)]
            nodes.forEach(function(node) {
                // 如果 $(a) 有多个元素，则克隆 node，不会修改原 node
                if (copyByClone) {
                    node = node.cloneNode(true)
                } else if (!parent) {
                    return $(node).remove()
                }

                // 一切都是为了这句
                parent.insertBefore(node, target)

                // 专门处理 target 是内嵌 script 的情况
                if (parentInDocument)
                    traverseNode(node, function(el) {
                        if (
                            el.nodeName != null &&
                            el.nodeName.toUpperCase() === "SCRIPT" &&
                            (!el.type || el.type === "text/javascript") &&
                            !el.src
                        ) {
                            var target = el.ownerDocument
                                ? el.ownerDocument.defaultView
                                : window
                            target["eval"].call(target, el.innerHTML)
                        }
                    })
            })
        })
    }

    // 根据上面的方法生成对应的方法
    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[
        inside
            ? operator + "To"
            : "insert" + (operatorIndex ? "Before" : "After")
    ] = function(html) {
        $(html)[operator](this)
        return this
    }
})
```

## 总结

1. 需要考虑target 是 原生对象、zepto object 和 html strings，以及它们几个的混合
2. 想一下方法的封装和生成，是将它们归一到 parentNode.insertBefore()来处理
3. 体味8个方法分为2组，每组方法又用 inside 进行分组。



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












# 创建对象

工厂模式的问题，是不好判断创建出来的对象的类型。因为经常要判断对象类型，然后做对应的事情。

arguments 是类数组，可以使用call的方式来调用数组的方法

[].join.call(arguments, '.')

this 和改变this bind call apply
this是函数在运行期确定的。代表执行环境

Function 的方法 bind call apply 
属性 
- length 形参的个数
- arguments.length 实参的个数
- name 函数的名字
- Function.prototype == Object

函数是一等公民（first class）
什么是first class, second class , third class

闭包，可以访问另一个函数作用域的函数，它实际是函数加其所在的环境。

构造函数是用来解决工厂模式不能确定类型的问题，构造函数可以通过instanceof来确定实例属于什么类型。
new 关键字的原理。

构造函数的问题，引用类型的方法不能共用。

原型是函数的一个属性，一个对象。原型的constructor指向函数，函数的prototype属性是可读写的，可以添加属性。

通过构造函数创建的对象都会共享构造函数的原型。

`Person.prototype.isPrototypeOf(p1)`用于判断一个对象是否存在与另一个对象的原型链中。

纯原型创造对象有引用类型数据相互影响的问题。

创建对象的方法是构造函数加原型。共享方法，独立数据。
通过原型链查找覆盖属性。

属性的判断，in操作符，hasOwnProperty
in不管原型还是实例
hasOwnProperty是只在实例上。

## 继承

原型继承的问题。

1. constructor指向
2. 如果父类的实例属性为引用类型，则会相互影响
3. 共享属性不能在实例化子类的时候不能通过参数

借用构造函数的问题 `Person.call(this)`
1. 只能继承属性
2. 方法如果继承，会不共享

组合继承的问题
1. 会调用2个构造函数
2. 父实例的属性没有用到

最佳实践
- 做一个中间对象，方法都继承这个中间对象。
- 属性通过借用构造函数方式继承

```
function extendFn(child, parent){
    var proto = Object.create(parent.prototype)
    child.prototype = proto
    proto.constructor = child
}
```



https://github.com/Cedriking/is.js/blob/master/is.js