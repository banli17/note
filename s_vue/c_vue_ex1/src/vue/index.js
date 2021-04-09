import {initMixin} from './init'

function Vue(options) {
  this._init(options)
}

initMixin(Vue)  // 混入 init 方法

export default Vue
