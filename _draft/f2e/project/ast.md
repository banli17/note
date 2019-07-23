---
title: "ast编译解析"
date: 2019-06-08 09:24:55
tags:
---

AST(Abstract Syntax Tree)，叫抽象语法树，也叫语法树，是源代码语法结构的一种抽象表示。像`webpack`，`lint`，`babel`等工具核心都是通过将源代码生成语法树，对语法树进行操作和分析的。

它可以用来检查并处理代码,错误提示，代码高亮，自动不全等。

## 过程分析

语法树的操作有：

1. 生成：解析js源代码，生成语法树，可以使用库[esprima](https://github.com/jquery/esprima/stargazers)。
2. 遍历：遍历语法树，采用先序深度优先。在这个操作中可以修改树的内容。可以使用库[estraverse](https://github.com/estools/estraverse)。
3. 反编译: 即通过语法树重新反编译成js代码。可以通过库[escodegen]来实现。

## 简单示例：将箭头函数转es5函数

下面来一个简单的例子，如何将es6箭头函数转换成es5的函数。我们先在[在线解析器里输入我们的代码](http://esprima.org/demo/parse.html)。截图如下：

![](./ast/1.jpg)

可以看到，我们只需要在遍历ast树的时候，将左边的箭头函数的ast树修改成右边普通函数的ast树的形式，然后再将ast树反编译，就可以生成es5的函数代码了。下面是具体实现。

```javascript
const code = `
    const fn = (a, b) => { 
        return a + b
    }`

// 第1步，将代码转ast树
let ast = esprima.parseScript(code)

// 第2步，遍历ast，修改箭头函数节点为普通函数样子
estraverse.traverse(ast, {
    enter(node, parent) {
        // console.log(node.type, parent && parent.type)
        if (node.type === 'VariableDeclaration') {
            let body = node.declarations[0]
            node.id = body.id
            node.type = 'FunctionDeclaration'
            node.params = body.init.params

            // 处理 const fn = (a, b) => a + b 的情况
            if (body.init.type === 'ArrowFunctionExpression' && body.init.expression === true) {
                let a = body.init.body
                delete body.init.body

                body.init.body = {}
                body.init.body.type = 'BlockStatement'
                body.init.body.body = [{
                    type: 'ReturnStatement',
                    argument: a
                }]
                body.init.body.expression = false
            }

            node.body = body.init.body

            delete node.kind
            delete node.declarations
        }
    }
})

// 第3步：将新的ast转成code
let r = escodegen.generate(ast)
console.log(r)
// function fn(a, b) {
//     return a + b;
// }
```

## 使用babel操作ast

了解了ast的编译过程，下面来使用 babel 来操作 ast 树。和上面过程一样。`babel-core`和`babel-types`提供了很多方法，来简化我们来操作ast的过程。下面来自己写几个插件，来巩固学习并实现一些功能。


### 转换es6 class为es5

下面实现一下将下面一段es6 class代码转化为es5语法。

```javascript
class Person{
    constructor(name){
        this.name = name
    }

    getName(){
        return this.name
    }
}
```


babel-core
babel-types

arrowFunction
class
import   tree sharking


https://itnext.io/ast-for-javascript-developers-3e79aeb08343