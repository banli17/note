/**
 * 使用 koa-router
 */
const Koa = require('koa')
const Router = require('@koa/router');
const app = new Koa()

const router = new Router()

// app.use(async ctx => {
//     ctx.body = "hello world!"
// })

router.get('/', (ctx, next) => {
    ctx.body = "hello"
})
router.get('/api', (ctx, next) => {
    ctx.body = "hello api"
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8999)