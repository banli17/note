import { isSameVnode } from './index'
export function patch(oldVnode, vnode) {
    // oldVnode 是一个真实的元素
    // 1. 组件oldVnode是null  $mount()
    if (!oldVnode) {
        return createElm(vnode); // 根据虚拟节点创建元素
    }

    const isRealElement = oldVnode.nodeType
    // 2.初次渲染 oldVnode  是一个真实dom
    if (isRealElement) {
        // 初次渲染
        const oldElm = oldVnode; // id="app"
        const parentElm = oldElm.parentNode; // body
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个
        parentElm.removeChild(oldElm);
        return el; // vm.$el
    } else {
        // 3.diff算法 两个虚拟节点的比对
        // 1.如果两个虚拟节点的标签不一致 那就直接替换掉就结束 
        // div=>p
        if (oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
        }

        // 2.标签一样但是时两个文本元素 {tag:undefined,text}  {tag:undefined,text} 
        if (!oldVnode.tag) { // 标签相同而且是文本 
            if (oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text
            }
        }

        // 3.元素相同, 复用老节点，并且更新属性 
        let el = vnode.el = oldVnode.el;
        // 用老的属性和新的虚拟节点进行比对
        updateProperties(vnode, oldVnode.data);


        // 4.更新儿子

        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || [];

        if (oldChildren.length > 0 && newChildren.length > 0) {
            //  1.老的有儿子新的也有儿子 dom-diff
            updateChildren(el, oldChildren, newChildren);
        } else if (oldChildren.length > 0) { // 2.老的有儿子 新的没儿子 => 删除老儿子
            el.innerHTML = ''; // 清空 删除所有节点
        } else if (newChildren.length > 0) { // 3.新的有儿子 老的没儿子  => 在老节点上面增加儿子即可
            newChildren.forEach(child => el.appendChild(createElm(child)));
        }
        // ABCDF
        // NACBE
    }
}


function updateChildren(parent, oldChildren, newChildren) {

    let oldStartIndex = 0; // 老的头索引
    let oldEndIndex = oldChildren.length - 1; // 老的尾索引
    let oldStartVnode = oldChildren[0]; // 老的开始节点
    let oldEndVnode = oldChildren[oldEndIndex]; // 老的结束节点

    let newStartIndex = 0; // 新的头索引
    let newEndIndex = newChildren.length - 1; // 新的尾索引
    let newStartVnode = newChildren[0]; // 新的开始节点
    let newEndVnode = newChildren[newEndIndex]; // 新的结束节点

    function makeIndexByKey(oldChildren){
        let map = {};
        oldChildren.forEach((item,index)=>{
            map[item.key] = index; // {A:0,B:1,C:2,}
        });
        return map
    }

    let map = makeIndexByKey(oldChildren);

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 1.前端中比较常见的操作有 像尾部插入 头部插入 头移动到尾部 尾部移动头部，正序和反序
        // 1) 向后插入的操作
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex];
        }else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode); // 递归比对节点
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        }else if(isSameVnode(oldEndVnode,newEndVnode)){ // // 2.向前插入
            patch(oldEndVnode,newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        }
        else if(isSameVnode(oldStartVnode,newEndVnode)){ // 头移动到尾部
            patch(oldStartVnode,newEndVnode);
            // dom 操作时具备移动性的 会移动系欸但
            parent.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        }else if(isSameVnode(oldEndVnode,newStartVnode)){
            patch(oldEndVnode,newStartVnode);
            parent.insertBefore(oldEndVnode.el,oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex]
        }else{
            // 1.需要先查找当前 老节点索引和key的关系
            // 移动的时候通过新的key 去找对应的老节点索引 =》 获取老节点，可以移动老节点
            let moveIndex = map[newStartVnode.key];
            if(moveIndex == undefined){
                parent.insertBefore(createElm(newStartVnode),oldStartVnode.el);
            }else{
                let moveVnode = oldChildren[moveIndex];
                oldChildren[moveIndex] = undefined;
                patch(moveVnode,newStartVnode); // 如果找到了 需要两个虚拟节点比对
                parent.insertBefore(moveVnode.el,oldStartVnode.el)
            }
            newStartVnode = newChildren[++newStartIndex];
        }
        // 为什么v-for要增加key属性,key为什么不能用index
    }
    if (newStartIndex <= newEndIndex) {  // 新的比老的多 ，插入新节点
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 向前插入 向后插入
            // 看一眼newEndIndex 下一个节点有没有值
            let nextEle = newChildren[newEndIndex+1] == null? null:  newChildren[newEndIndex+1].el;
            // appendChild 和 insertBefore 也可以进行合并
            // 如果insertBefore 传入null 等价于appendChild
            parent.insertBefore(createElm(newChildren[i]),nextEle)
            // parent.appendChild(createElm(newChildren[i]));
        }
    }
    if(oldStartIndex <= oldEndIndex){
        for(let i = oldStartIndex; i<=oldEndIndex;i++){
            let child = oldChildren[i];
            if(child != undefined){
                parent.removeChild(child.el); // 用父亲移除儿子即可
            }
        }
    }
}

function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {}; // 属性
    let el = vnode.el; // dom元素
    // 1.老的属性 新的没有  删除属性
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key);
        }
    }
    let newStyle = newProps.style || {}; // {color:blue}
    let oldStyle = oldProps.style || {} // {background:red}
    for (let key in oldStyle) { // 判断样式根据 新老先比对一下
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }
    // 2.新的属性老的没有 , 直接用新的覆盖 不考虑有没有
    for (let key in newProps) {
        if (key == 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key]);
        }
    }
}

function createComponent(vnode) {
    let i = vnode.data;
    if ((i = i.hook) && (i = i.init)) {
        i(vnode); // 调用组件的初始化方法 // vnode.componentInstance.$el
    }
    if (vnode.componentInstance) { // 如果虚拟节点上有组件的实例说明当前这个vode是组件
        return true;
    }
    return false;
}

export function createElm(vnode) { // 根据虚拟节点创建真实的节点
    let { tag, children, key, data, text, vm } = vnode;
    if (typeof tag === 'string') { // 两种可能 可能是一个组件
        // 可能是组件, 如果是组件 就直接根据组件创建出组件对应的真实节点
        if (createComponent(vnode)) {
            // 如果返回true 说明这个虚拟节点是组件
            // 如果是组件，就将组件渲染后的真实元素给我
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag); // 用vue的指令时 可以通过vnode拿到真实dom
        updateProperties(vnode);
        children.forEach(child => { // 如果有儿子节点，就进行递归操作
            vnode.el.appendChild(createElm(child))
        })
    } else {
        vnode.el = document.createTextNode(text)
    }

    return vnode.el;
}