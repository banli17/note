let _Vue

export default class VueRouter {
  constructor(options) {
    this.options = options
    this.routerMap = {} // path -> component 映射表

    // 响应式对象，当前路由变化时做一些事情
    const pathname = location.pathname || '/'
    console.log('pathname', pathname)
    this.data = _Vue.observable({
      current: pathname
    })

    this.init()
  }

  // 不写 install 会报错 Class constructor VueRouter cannot be invoked without 'new'
  static install(Vue) {
    // 防止重复安装
    if (VueRouter.install.installed) {
      return
    }
    console.log('install');
    VueRouter.install.installed = true

    _Vue = Vue

    // 混入 create
    // 3 把 router 对象注入到每个 Vue 实例上
    // _Vue.prototype.$router = this.$options.router // 但是这个 this 实例有问题，子组件没有 $options.router
    Vue.mixin({
      beforeCreate() {
        console.log('create', this)
        if (this.$options.router) { // 只执行一次
          _Vue.prototype.$router = this.$options.router
          // 根实例 new Vue({router})
        }
      }
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    const {
      routes
    } = this.options

    routes.map(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: `<a :href='to'><slot></slot></a>`,
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.handlerClick
          }
        }, [this.$slots.default])
      },
      methods: {
        handlerClick(e) {
          history.pushState({}, '', this.to)

          this.$router.data.current = this.to

          e.preventDefault()
        }
      }
    })

    const self = this

    Vue.component('router-view', {
      render(h) {
        const component = self.routerMap[self.data.current] // 这里进行依赖搜集, 才会重新渲染

        console.log('router-view render', component)
        return h(component)
        // return h(self.routerMap['/'])
      }
    })
  }

  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = location.pathname
    })
  }
}
