import {mergeOptions} from "../utils";
import initExtend from './extend'

export function initGlobalAPI(Vue) {
    // 所有的属性都会合并到 Vue.options 上
    Vue.options = {}
    // initMixin()
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(Vue.options, mixin)

        console.log('this.options', this.options)
    }

    Vue.options._base = Vue
    Vue.options.components = {}

    initExtend(Vue)

    // initAssetRegisters
    Vue.component = function (id, definition) {
        definition.name = definition.name || id // 组件名
        // 永远是父类
        definition = this.options._base.extend(definition)

        // 注册组件
        Vue.options.components[id] = definition
    }

    Vue.options.direction = {}
    Vue.options.filter = {}
}

