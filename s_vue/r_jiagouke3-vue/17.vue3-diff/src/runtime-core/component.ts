
import { isFunction } from "../shared";

export function createComponentInstance(vnode){
    const instance = { // vue2 的指令  vnode
        type:vnode.type,
        props:{},
        subTree:null, // 表示组件对应的子元素的虚拟节点 _vnode 组件中渲染的内容的虚拟节点 $vnode 组件本身的虚拟节点
        vnode,
        render:null, // 渲染函数
        setupState:null,// setup返回的状态
        isMounted:false, // 目前这个组件没有被挂载
    }

    return instance
}

export function setupComponent(instance){
    // 属性 插槽处理
    setupStatefulComponent(instance);
}

function setupStatefulComponent(instance){
    const Component = instance.type; // 用户的App组件
    let {setup} = Component;
    if(setup){
        const setUpResult = setup(instance.props);
        // setup 可以返回render函数 还可以返回状态对象
        handleSetupResult(instance,setUpResult);
    }
}
function handleSetupResult(instance,setUpResult){
    if(isFunction(setUpResult)){
        instance.render = setUpResult; // vue2=> render
    }else{
        instance.setupState = setUpResult; // 一个状态可以用于模板渲染时使用的数据
    }
    // 当前用户可能使用了vue2的写法
    finishComponentSetup(instance);
}

function finishComponentSetup(instance){
    const Component = instance.type; 
    if(Component.render && !instance.render){ // 是render函数
        instance.render = Component.render // 全部以setup为准
    }else if(!instance.render){
        // 没有写render方法 template => ast => codegen render 生成后的结果做为render

    }
    // 变量合并  用当前实例的数据和原有的vue2.0中的代码进行合并 
    applyOptions(instance); // 合并属性 data computed 
}

function applyOptions(instance){
    
}

