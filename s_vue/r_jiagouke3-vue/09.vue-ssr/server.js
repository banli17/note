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

app.use(router.routes());

router.get('/',async ctx=>{
    ctx.body =await new Promise((resolve,reject)=>{
        render.renderToString((err,html)=>{ //  虽然本身是promise 但是使用async await 不能解析样式 只能通过回调的方式
            resolve(html)
        })
    }); // ，渲染成字符串
})
app.use(static(path.resolve(__dirname,'dist'))); 

app.listen(3000);

// ssr 渲染流程 router + vuex