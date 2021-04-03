/**
 * koa 基础
 */
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = "hello world!"
})

app.listen(8999)