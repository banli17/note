/**
 * 使用 koa-router
 */
const Koa = require('koa')
const Router = require('@koa/router');
const json = require('koa-json')
const cors = require('@koa/cors')
const body = require('koa-body')

const app = new Koa()

const router = new Router()

app.use(cors())
    .use(body())
    .use(json({ pretty: false, param: 'pretty' }));

router.prefix('/koa-app')

router.get('/', (ctx, next) => {
    ctx.body = "hello"
})
router.post('/api', (ctx, next) => {
    const { headers, query, body } = ctx.request
    ctx.body = {
        headers: {
            headers,
        },
        params: {
            ...query
        },
        body: {
            ...body
        },
        responseHeader: {
            ...ctx.response.headers
        }
    }
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8999)