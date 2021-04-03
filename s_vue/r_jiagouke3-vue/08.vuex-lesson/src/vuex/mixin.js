function vuexInit() {
    if (this.$options.store) { // 根

        // this.$options.store => new Vuex.Store
        // this.$store =>  new Vuex.Store
        this.$store = this.$options.store; // 给根属性增加$store属性
    } else if (this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store
    }
}
export const applyMixin = (Vue) => { // $store 我需要将store属性 分配给所有的组件
    // install 执行就会让mixin 执行  Vue.options
    // 子组件在渲染的时候 会调用beforeCreate
    Vue.mixin({
        beforeCreate:vuexInit
    })
}