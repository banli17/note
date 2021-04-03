import Vue from 'vue'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
/**
 *
 * 
Vue.use = function (plugin,options) {
  plugin.install(this,options)
}
 */

Vue.use(VueRouter,{}); // 为了使用Vue-router可以版本和用户使用的一致
const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/about',
  name: 'About',
  component: About, // /about/a  /about/b
  children: [{
    path: 'a',
    component: { // runtime-only / render方法
      render(h) { // js + html的语法
        return <h1>hello a</h1>
        //  return h('h1',null,'hello a')
      }
    }
  },{
    path:'b',
    component:{
      render(h){
        return <h1>hello b</h1>
      }
    }
  }]
}
]
// vueRouter 是一个构造函数 前端路由实现 1.hash模式 2.history
// 当前都叫spa 应用 ，路径切换可以重新渲染组件 （不刷新页面）
// hash 特点丑 兼容性好  location.hash = 'xx' / window.addEventListener('hashchange')
// history 漂亮像正常路径一样，但是需要服务端支持 history-fallback  pushState / window.addEventListener('popstate') 


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next)=>{ // express / koa的中间件
  setTimeout(() => {
   console.log(1);
    next();
  }, 1000);
})

router.beforeEach((to,from,next)=>{ // express / koa的中间件
  setTimeout(() => {
    console.log(2)
    next();
  }, 1000);
})

// [fn1,fn2] => 渲染逻辑
export default router