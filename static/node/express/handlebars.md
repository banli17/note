# handlebars模板引擎

pug模板引擎个人用起来很不习惯，而且感觉它适合做一个新项目。如果是仿站啥的，或在别人的模板上修改就用起来不方便了。这个时候handlerbars出场了。 它类似使用php框架套模板一样，上手很快。


## 使用


## 一些问题

**1. 如何让后台返回变量赋值给前端js变量？**

只能用编码过的(主要是编码引号)json，其它方法会报错。

```
// node.js
let message = encodeURIComponent(JSON.stringify([{hi: "hi"}, {"hi": "hello"}]))
res.render('index', {title: 'hi', message})

// hbs
new Vue({
    data: {
        info: JSON.parse(decodeURIComponent('{{message}}')) 
    }
})
```

