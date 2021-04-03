export default {
    name: 'routeView',
    functional: true, // 函数组件，性能高，没有实例this 无状态(响应式数据) 生命周期 等，只接受 props
    props: {},
    render(h, context) {
        console.log(context)  // FunctionalRenderContext
        // context.data.attrs context.props 都是传递的属性
        let {parent, data} = context
        let route = parent.$route; // this.current

        let depth = 0
        data.routeView = true

        // 组件的 $vnode 代表占位符，如 <component-3-app>
        // _vnode 是真实的虚拟组件，_vnode.parnet = $vnode
        // 会用 真实虚拟组件替换 $vnode
        // 这里的 parent 分别是 <app>  <about>
        // 查找 当前 route-view 的深度
        while (parent) {
            console.log('parent.$vnode', parent.$vnode)
            console.log(parent.$options.name)
            // 如果是 route-view
            if (parent.$vnode && parent.$vnode.data.routeView) {
                depth++
            }
            parent = parent.$parent
        }

        // 根据当前 route-view 的深度，渲染 matched 的组件
        console.log('depth', depth)
        console.log('route.matched, ', route.matched)
        let record = route.matched[depth]
        if (!record) {
            return h()  // 空的虚拟节点 empty-vnode 注释节点
        }

        return h(record.component, data)
    }
}
