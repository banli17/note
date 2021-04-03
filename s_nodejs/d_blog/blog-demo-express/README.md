# express

- use get等，路由需要以/开头

## 中间件

### express-session

```
app.use(session({
    secret: 'Hello', // 密钥
    cookie: {
        path: '/',          // 默认配置
        httpOnly: true,      // 默认
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore  // 使用redis存储。没有则存在内存中
}))
```

### redis-connect

```js
const RedisStore = require('redis-connect')(session)
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})
```

### loginCheck

### 中间件原理

- 先将use get post等搜集起来
- http请求时，根据method触发




## 日志

- access log 记录，直接用morgan
- 自定义日志，用console.log和console.error

```js
app.use(logger('dev'),{
    stream: process.stdout,  // 默认
})
```

async await要点:
- async 返回的是 promise
- await 后面跟 promise
- await 必须包裹在 async 函数里
- await 的 reject 处理，try catch


## koa2

- 脚手架：`koa-generator`
- 生成项目：`koa2 blog-koa2`
- `npm i cross-env`

```
koa-json
koa-onerror
koa-bodyparser
koa-logger
koa-static


ctx 是 req res的集合
ctx.request.body
ctx.body 返回内容

router.prefix()  父路由


```

登陆

```
koa-generic-session
koa-redis
```

## 线上

pm2
- 进程守护，系统崩溃自动重启
    - 比如访问/err 这样报错导致崩溃
    - 重启后可以访问其它正常的页面
- 启动多进程，充分利用CPU和内存
- 自带日志记录功能
    - `console.log` -> `app-out.log`
    - `console.error` -> `app-error.log`

```
pm2 --version
pm2 start <appname.js>
pm2 list
pm2 restart <appname>/<id>
pm2 stop <appname>/<id>
pm2 delete <appname>/<id>
pm2 info <appname>/<id>
pm2 log <appname>/<id>  # 查看日志 
pm2 monit <appname>/<id>  # 查看内存信息
```

配置
- 新建pm2配置文件(包括进程数量，日志文件目录)
- 修改pm2启动命令，重启
- 访问server，检查日志文件的内容(日志记录是否生效)

pm2.conf.json

```json
{
    "apps":{
      "name":"pm2-test-server",
      "script": "app.js",
      "watch": true,
      "instances": 4,  // 多进程
      "ignore_watch":[
        "node_modules",
        "logs"
      ],
      "error_file": "logs/err.log",
      "out_file": "logs/out.log",
      "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
}
```

`pm2 start pm2.conf.json`

多进程
- 为什么使用多进程?  核和进程的关系
    - 操作系统单个进程的内存是受限的，node 在32位最大1.6g。无法利用全部内存。
    - 无法充分利用CPU多核
- 多进程和redis?
    - 多进程之间session无法共享，所以存在redis中，实现数据共享
    - pm2会看哪个进程空闲，将请求分配给空闲的进程

op 运维
N/A是Not Applicable ，不相关、没有