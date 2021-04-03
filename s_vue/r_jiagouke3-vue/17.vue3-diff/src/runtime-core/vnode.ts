import { data } from "jquery"
import { isArray, isObject, isString, ShapeFlags } from "../shared"

export function createVNode(type, props = {} as any, children = null) { // h（type,props,children)

    // 如果是组件 那么组件的类型是对象
    const shapeFlag = isString(type) ?
        ShapeFlags.ELEMENT :
        isObject(type) ?
            ShapeFlags.STATEFUL_COMPONENT : 0


    // 可以标识出当前 是组件还是元素
    // shapeFlag


    let vnode = {
        type, // 
        props,
        children,
        component: null, // 组件的实例 稍后用于保存组件对应的实例
        el: null,
        key: props.key,
        shapeFlag // 可以描述自己 也同时描述了孩子
    }
    if(isArray(children)){
        // 元素配合多个儿子 
        // 00000001 假如是元素
        // 00010000 假如元素中有多个儿子
        // ---10001  => 17 或运算 在运算的过程中有一个是1
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN; // 1000
    }else{
        // 00000010 假如是组件  组件里面可能是空 也可能是文本
        vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN; 
    }
    // vue2 里面 区分孩子是不是数组 
    return vnode;
}