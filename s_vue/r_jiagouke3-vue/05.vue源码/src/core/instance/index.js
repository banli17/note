import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'


// Vue的构造函数
function Vue (options) {
  this._init(options)
}

// 给Vue扩展原型方法
initMixin(Vue) // Vue.prototype._init
stateMixin(Vue) // $data $props $set $delete $watch
eventsMixin(Vue) // $on $once $emit
lifecycleMixin(Vue)// Vue.prototype._update
renderMixin(Vue) // Vue.prototype._render

// 慢慢看

export default Vue
