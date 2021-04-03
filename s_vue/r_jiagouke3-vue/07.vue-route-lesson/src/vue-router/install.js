// 需要将install方法单独的进行拆分
export let _Vue;
import RouterLink from './components/router-link';
import RouterView from './components/router-view';


export function install(Vue, options) {
    _Vue = Vue;

    // 我需要将当前的根实例的提供的router属性共享给所有子组件

    // 所有子组件初始化的时候 都会去调用Vue.extend  Vue.options

    Vue.mixin({
        beforeCreate() { // 每个组件都会执行beforecreate方法
            // 获取到每个人的实例，给实例添加属性
            if (this.$options.router) {
                this._routerRoot = this; // 把根实例挂在到_routerRoot上
                this._router = this.$options.router;
                //  this._router 路由的实例 new VueRouter
                this._router.init(this);
                // global-api 里面定义了这个方法 

                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // this._routerRoot指向了当前 根组件的实例
                // iifecycleMixin  构建父子关系
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // this._routerRoot._router
            }
        }
        // 根_routerRoot => 父亲_routerRoot => 儿子_routerRoot => 孙子_routerRoot
    });

    Object.defineProperty(Vue.prototype,'$route',{
       get(){
          return this._routerRoot._route // current 对象里面放的都是属性 path matched
       }
    });
    Object.defineProperty(Vue.prototype,'$router',{
      get(){
         // router.history.push()
         return this._routerRoot._router; // addRoute match 
      }
   });
   Vue.component('router-link',RouterLink);
   Vue.component('router-view',RouterView)
}