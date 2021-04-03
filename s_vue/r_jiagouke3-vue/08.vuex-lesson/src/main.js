import Vue from 'vue'
import App from './App.vue'
import store from './store' // store

Vue.config.productionTip = false


// 注入vue-router 后所有组件都可以获取到 _router $router

// 注入的就是vuex中的store 所有组件都可以通过$store 拿到这个变量

const vm = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

