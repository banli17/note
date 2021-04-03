import Vue from 'vue';
import App from './App.vue'
// new Vue({
//     el: '#app',
//     render: h => h(App)
// })

// 把创造实例的过程 变成函数的方式

// 服务端每次执行 都要创建一个全新的实例
export default ()=>{
    const app = new Vue({
        render: h => h(App)
    });
    return {app}
}