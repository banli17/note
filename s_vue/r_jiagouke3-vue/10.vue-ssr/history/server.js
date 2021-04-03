const Vue = require('vue');
const fs = require('fs');
const path = require('path');
const VueServerRenderer = require('vue-server-renderer')
const vm = new Vue({
    data(){
        return {msg:'zf'}
    },
    template:`<div>{{msg}}</div>`
});
// 通过服务端渲染包 创建一个渲染器
const template = fs.readFileSync(path.resolve(__dirname,'template.html'),'utf8')
const render = VueServerRenderer.createRenderer({
    template
})

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
app.use(router.routes()); // koa应用中加载了路由系统

router.get('/',async (ctx)=>{
    ctx.body = await render.renderToString(vm);
});
app.listen(3000);
// npm install nodemon -g