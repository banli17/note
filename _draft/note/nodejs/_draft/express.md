---
        title: 无名
        ---
        # express

## 安装

```
npm i express
```

## 中间件

```
var express = require('express')
var app = express()

app.get('/', function(req, res, next){
    console.log('中间件1')
    next()
})

app.use(function(req, res, next){
    // 全局中间件，所有的路由都会经过这个中间件
})
```

## 路由

**请求方式**
- get
- post
- all

**path**
- 字符串
- 字符串模式 'page/*'，p(age)?/1
- 正则 /page/
- 带参数的字符串 /page/:name

**回调函数**

回调函数可以是一个、多个或数组

```javascript
app.get('/', function(){ next()},function(){})
app.get('/', [c1,c2,c3])
```

获取query的参数

```
// 获取query参数，req.query.name
/page?name=hello

// 获取params，通过 req.params.name
/page/hello
app.get('/page/:name')

// req.body.name
/page

// req.params("a") 获取上面所有参数
```

- res.json()
- res.jsonp()  callback({"user":"hello"})
- res.render()


## 应用生成器

通过下面的命令生成项目。

```bash
npm i express-generator - g
express myapp
cd myapp
npm i
npm start
```

## 模板引擎

本质就是用动态数据替换模板字符串里的特殊字符串。

**ejs**

```
// html转义并输出
<%=name%>

// 原样输出字符串
<%-htmlString%>

// 使用 js 编写逻辑
<% %>

res.render('index', {
    name:'zs',
    age: 12
})
```



## 稳健的 web 服务

- 架构
- 开发
- 部署：测试服务器、正式服务器
- 测试
- 监控


### 架构设计

-


MVC
- model db
- controller  -> web service -> 浏览器
- view

- [](./imgs/dir.png)


```
yum install nodejs
```

### 任务脚本start.sh

```
#!/bin/bash

nohup node server.js &
nohup node server.js >> /data/server.jog 2>$1
```

停止脚本top.sh

```
kill -9 $(ps aux | grep '\snode\s' | awk ''
kill node
```







