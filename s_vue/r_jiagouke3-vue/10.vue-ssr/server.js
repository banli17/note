const Vue  =require('vue');
const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const static = require('koa-static')

let bundle = fs.readFileSync(path.resolve(__dirname,'dist/server.bundle.js'),'utf8')
let template = fs.readFileSync(path.resolve(__dirname,'dist/index.ssr.html'),'utf8')
const render = VueServerRenderer.createBundleRenderer(bundle,{ // 使用服务端打包的结果
    template
})

const app = new Koa();
const router = new Router();

// 先找静态文件 在找路由 *

// 如果先匹配路由 不管访问什么 都会走到路由匹配中


app.use(static(path.resolve(__dirname,'dist'))); 

app.use(router.routes());
// 当访问任意路径时 都可以匹配到
router.get("/(.*)",async ctx=>{
    ctx.body = await new Promise((resolve,reject)=>{
        render.renderToString({url:ctx.url},(err,html)=>{

            if(err && err.code == 404){
                return resolve('Not found 11');
            }

            resolve(html); // 当前路径访问不到直接返回首页，前端路由 会根据路径 进行跳转
        })
    })
})




app.listen(3000);

// ssr 渲染流程 router + vuex