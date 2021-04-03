import {mergeOptions} from "../utils";

export default function initExtend(Vue) {
    let cid = 0
    Vue.extend = function (extendOptions) {
        const Super = this
        const Sub = function VueComponent(options) {
            this._init(options)
        }
        // 原型继承
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub
        Sub.cid = cid++

        // 处理其它属性 mixin component
        Sub.options = mergeOptions(Super.options, extendOptions)

        return Sub
    }
}
