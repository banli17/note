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
        console.log(setUpResult,instance.type);
        // diff 算法 2次
    }
}


export function  setupRenderEffect() {
    
}