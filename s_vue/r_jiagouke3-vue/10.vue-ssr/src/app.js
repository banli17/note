import Vue from 'vue';
import App from './App.vue';
import createRouter from './router'
import createStore from './store'
// new Vue({
//     el: '#app',
//     render: h => h(App)
// })

// 把创造实例的过程 变成函数的方式

// 服务端每次执行 都要创建一个全新的实例
export default ()=>{
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    return {app,router,store};
}