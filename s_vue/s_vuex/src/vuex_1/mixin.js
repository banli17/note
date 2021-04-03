export default function applyMixin(Vue) {
    // 在 beforeCreate 时，给组件添加 $store 属性
    Vue.mixin({
        beforeCreate: vueInit
    })
}

function vueInit() {
    console.log(this.$options.name)
    // 获取根实例，然后获取子，增加 $store
    // 根实例才有 store 属性
    let options = this.$options
    if (options.store) {
        this.$store = options.store
    } else if (options.parent && options.parent.$store) {
        // options.parent this.$parent 都可以获取到父组件
        this.$store = options.parent.$store
    }
}
