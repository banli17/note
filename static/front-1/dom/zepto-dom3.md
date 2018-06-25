# Zepto dom 源码阅读(一)

> 本系列文章基于 Zepto 1.2.0 源码

## 资料

- [http://jquery.cuishifeng.cn/](http://jquery.cuishifeng.cn/)
- [http://www.css88.com/doc/zeptojs_api](http://www.css88.com/doc/zeptojs_api/)

## dom操作总览

zepto中关于 dom 操作的方法分类如下：

1. dom节点的增加、删除、替换、查找。比如append()、after()、find()等
2. css的操作，比如 css()、addClass()、hasClass()等

## 节点插入方法

这一节主要学习 zepto 的 1200 - 1293 行代码。实现了下面8个节点插入方法。

- append
- appendTo
- prepend
- prependTo
- after
- before
- insertAfter
- insertBefore

## 源码阅读

```javascript
function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
        traverseNode(node.childNodes[i], fun)
}

// Generate the `after`, `prepend`, `before`, `append`,
// `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> 选中 prepend, append

    $.fn[operator] = function() {
        // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
        var argType,
            nodes = $.map(arguments, function(arg) {
                var arr = []
                argType = type(arg)
                if (argType == "array") {
                    arg.forEach(function(el) {
                        if (el.nodeType !== undefined)
                            return arr.push(el)
                        else if ($.zepto.isZ(el))
                            return (arr = arr.concat(el.get()))
                        arr = arr.concat(zepto.fragment(el))
                    })
                    return arr
                }
                return argType == "object" || arg == null
                    ? arg
                    : zepto.fragment(arg)
            }),
            parent,
            copyByClone = this.length > 1

        // 如果参数节点为空，即 $(a).append($(b))  b为空
        if (nodes.length < 1) return this

        return this.each(function(_, target) {
            console.log(_, target)
            parent = inside ? target : target.parentNode
            console.log('parent', parent)

            // convert all methods to a "before" operation
            target =
                operatorIndex == 0  // after -> a.after(b)  -> a
                    ? target.nextSibling  // a.nextSibling
                    : operatorIndex == 1  // prepend  a.prepend(b)
                        ? target.firstChild  // a.firstChild
                        : operatorIndex == 2  // before
                            ? target
                            : null

            var parentInDocument = $.contains(
                document.documentElement,
                parent
            )

            nodes.forEach(function(node) {
                if (copyByClone) node = node.cloneNode(true)
                else if (!parent) return $(node).remove()

                parent.insertBefore(node, target)
                if (parentInDocument)
                    traverseNode(node, function(el) {
                        if (
                            el.nodeName != null &&
                            el.nodeName.toUpperCase() === "SCRIPT" &&
                            (!el.type ||
                                el.type === "text/javascript") &&
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