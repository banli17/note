import VNode from "./vnode";

// 注释节点
export const createEmptyVnode = text => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
}

const commentVNode = createEmptyVnode("你好，这是一个注释节点")

console.log(commentVNode)

// 文本节点
export function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

const textVNode = createTextVNode("这是一个文本")
console.log(textVNode)

// 克隆节点：将现有节点属性克隆到新节点，作用是优化静态节点和插槽节点 slot node，静态节点只有首次通过 vnode 渲染，后续更新不需要执行渲染函数生成 vnode，这时会使用将 vnode 克隆一份，使用克隆节点进行渲染，这样不需要执行渲染函数生成静态节点的 vnode，从而提升一定性能
export function cloneVNode(vnode, deep) {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory,
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.isCloned = true
    if (deep && vnode.children) {
        cloned.children = cloneVNodes(vnode.children)
    }
    return cloned
}

function cloneVNodes() {

}

/**
 * 元素节点
 * - tag ： li div
 * - data 属性： class, style, attrs
 * - children
 * - context: 当前组件的 Vue.js 实例
 */

/**
 * 组件节点: 和元素节点类型，还有2个独有属性
 * componentOptions: 组件的参数，包含propsData, tag, children等
 * componentInstance: 组件的实例，也是 Vue.js 的实例，每个组件都是 Vue.js 的实例
 * {
 *     componentInstance:{},
 *     componentOptions:{},
 *     context:{},
 *     data:{},
 *     tag: "vue-component-1-child",
 * }
 */

/**
 * 函数式组件，有2个独有属性
 * {
 *     functionalContext:{},
 *     functionalOptions:{},
 *     context:{},
 *     data:{},
 *     tag: "div"
 * }
 */


