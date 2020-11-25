/**
 * koa 中间件，就是一个函数
 * 洋葱模型
 * 没有 next 则不往下走
 */
const Koa = require('koa')
const app = new Koa()

const middleware = async function (ctx, next) {
    console.log(ctx.request.url);
    console.log('middleware');
    // next()
    console.log('middleware end');
}

const middleware1 = async function (ctx, next) {
    console.log(ctx.request.url);
    console.log('middleware1');
    next()
    console.log('middleware1 end');
}

app.use(middleware)
app.use(middleware1)

app.listen(8998)