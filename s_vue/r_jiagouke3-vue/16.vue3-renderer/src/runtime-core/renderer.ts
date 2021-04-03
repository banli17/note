import { ShapeFlags } from "../shared";
import { createAppApi } from "./apiCreateApp";
import { createComponentInstance, setupComponent, setupRenderEffect } from "./component";

export function createRenderer(options) { // options 不同平台传入的不同， 我们core中不关心options里的api具体是什么 ，只需要调用即可
    const mountElement = (vnode,container)=>{

    }
    const patchElement = (n1,n2,container)=>{

    }
    const mountComponent = (vnode,container)=>{

        // vue是组件级别更新的 每个组件应该有个 effect 渲染effect

        // 组件的创建 我拿到外边去
        const instance = vnode.component = createComponentInstance(vnode); // 根据虚拟 创建实例

        // 找到组件的setup方法
        setupComponent(instance);

        // 设置渲染effect
        setupRenderEffect();


    }
    const updateComponent = (n1,n2,container) => {

    }
    const processElement = (n1,n2,container) =>{
        if(n1 == null){
            // 组件挂载
            mountElement(n2,container);
        }else {
            patchElement(n1,n2,container)
        }
    }
    const processComponent = (n1,n2,container)=>{
        if(n1 == null){
            mountComponent(n2,container);
        }else{
            updateComponent(n1,n2,container)
        }
    }

    const patch = (n1,n2,container)=>{
        // 开始渲染
        let {shapeFlag} = n2;

        // 此时我现在判断的是最外层元素，没有到儿子内部
        // 1100     0001  都是1 才是1
        if(shapeFlag & ShapeFlags.ELEMENT){ // 1  可以用& 操作来判断是否包含这个类型
            processElement(n1,n2,container);

            // 1100   100
        }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
            processComponent(n1,n2,container)
        }
    }


    const render = (vnode,container)=>{ // 渲染器逻辑 
        // 初次渲染 没有prevVnode   更新渲染  prevVnode
        patch(null,vnode,container);
    }
    return {
        createApp:createAppApi(render) // 为了方便扩展 我将createAppApi方法改造成了高阶函数方便传入参数
    }
}

// 核心包肯定有很多方法