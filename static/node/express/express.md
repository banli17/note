# express

## 学习资料

- [express中文文档](http://www.expressjs.com.cn/)

## 常用总结

**1. 如何解析参数?**

分为get，post提交。get直接解析url即可，post使用`body-parser`中间件。

```javascript
// get
var {query} = url.parse(req.url, true)

// post
var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/*+json' }))
app.post('', function(req, res){
    var query = req.body
})
```

**2. req、res常用的属性**

```javascript
// request
req.method
req.originalUrl
req.url
req.params.id    // 地址上的参数，对应 /user/:id 这种路由

// response
```

**3. 说说express.static()的用法和参数?**

`express.static(root, [options])`用于提供托管静态资源服务，root表示静态资源的根目录。

```javascript
var options = {
    dotfiles: 'ignore',    // 是否对外输出文件名以.开头的文件，可选ignore(默认)、allow、deny
    etag: false,           // 是否启用etag生成，默认是true
    extensions: ['html'],  // 设置文件扩展名备份选项，是个Array
    index: false,          // false表示禁用目录索引，默认是index.html，值为Mixed类型
    lastModified: true,    // 设置Last-Modified头为文件最后修改日期
    maxAge: 0,             // 以毫秒或字符串格式设置Cache-Control头的max-age属性
    redirect: true,        // 当路径为目录时，重定向至/
    setHeaders: function(res, path, stat){  // 设置http头以提供文件的函数
        res.set('x-timestamp', Date.now())
    }
}

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

**4. 错误处理**

需要使用中间件制造错误来源，然后交给下一个错误处理中间件来处理

```javascript
/ catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found")
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})
```

