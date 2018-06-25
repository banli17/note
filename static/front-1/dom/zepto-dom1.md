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