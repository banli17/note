import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router, // 创建实例时提供router属性 表示初始化路由
  render: h => h(App),
}).$mount('#app')
