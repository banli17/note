---
        title: 无名
        ---
        # 文件上传

## formidable处理文件上传

处理表单
1. 处理表单域
2. 用formidable处理上传的文件
3. 实时计算上传进度

表单提交的Content-Type值通常有2种
1. `application/x-www-form-urlencoded` html表单默认值
2. `multipart/form-data` 表单有文件或二进制数据时使用

**html代码**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="/" method="POST" enctype="multipart/form-data">
    <p><input type="text" name="name"></p>
    <p><input type="file" name="file"></p>
    <p><input type="submit" value="upload"></p>
</form>
</body>
</html>
```

**node.js代码**

```javascript
const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        var r = fs.createReadStream('./3.html')
        r.pipe(res)
    } else {
        upload(req, res)
    }
})

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400
        res.end('bad request')
        return
    }
    var form = new formidable.IncomingForm()
    form.on('field', (field, value) => {
        console.log(field, value)
    })
    form.on('progress', (bytesReceived, bytesExpected) => {
        var percent = Math.floor(bytesReceived / bytesExpected * 100)
        console.log(percent)
    })

    form.on('file', (name, file) => {
        console.log(name)
        console.log(file)
    })
    form.on('end', () => {
        res.end('upload complete')
    })
    form.parse(req)
}

function isFormData(req) {
    const type = req.headers['content-type'] || ''
    return 0 == type.indexOf('multipart/form-data')
}

server.listen(3000)
```
