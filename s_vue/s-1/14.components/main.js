import Vue from 'vue'
import App from './App'


console.log(App)

Vue.prototype.$dispatch = function (ename, componentName, value) {
    let parent = this.$parent
    while (parent) {
        if (parent.$options.name === componentName) {
            parent.$emit(ename, value)
            // 组件名是可以重复的，作用1:是 devtool 提示友好，
            // 2:使用 Vue.component 注册全局组件的 id 就是 name
            // 3. 递归组件必须用 name
            // 4 keep-alive exclude include 可以排除要缓存的组件
            //return
        }
        parent = parent.$parent
    }
}
Vue.prototype.$broadcast = function (ename, componentName, value) {
    // 是个数组
    let children = this.$children

    function broadcast(children) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child.$options.name === componentName) {
                child.$emit(ename, value)
            }
            if (child.$children && child.$children.length) {
                broadcast(child.$children)
            }
        }
    }

    broadcast(children)
}

new Vue({
    el: '#app',
    // 默认是 runtime-only 版本，它会先编译 .vue 里的 template 为 render
    // template: '<div>hello</div>', 无效，只能写 render

    render: h => h(App),
    // 也可以写成...App，因为 App 组件里也有 render 方法
})
