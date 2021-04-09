// import Vue from './vue'
import Vue from 'vue'
import App from './App'
// Vue.config.productionTip = false

console.log(App)
let vm = new Vue({
  el: '#app',
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 1
      },
      e: [1, {name: 'ls'}, 3]
    }
  },
  render: h => h(App)
})
// vm.e[1].name = 'zs'
// vm.e.push({age: 12})
// vm.x = {name: '11'}
// vm.x.name  = 4
// vm.x = 222
// vm.c.e = 33
// vm.e[3].age = 11
vm.c.e = '33' // 设置了值
console.log(vm)

