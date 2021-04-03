import Link from './components/router-link'
import View from './components/router-view'
export let _Vue

export default function install(Vue) {
    _Vue = Vue

    Vue.mixin({
        beforeCreate() {
            // 给所有组件挂载 _routerRoot，让其指向根实例
            if (this.$options.router) {
                this._routerRoot = this  // 给根组件增加 _routerRoot
                this._router = this.$options.router

                this._router.init(this) // 初始化 ?

                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // 子组件可以通过 _routerRoot._router 获取到用户的 router 对象
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })

    Vue.component('router-link', Link)
    Vue.component('router-view', View)

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route  // path params matched 等
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router  // push go replace
        }
    })
}

