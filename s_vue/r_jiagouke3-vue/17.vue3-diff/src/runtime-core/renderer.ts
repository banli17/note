import { effect } from "../reactivity";
import { ShapeFlags } from "../shared";
import { createAppApi } from "./apiCreateApp";
import { createComponentInstance, setupComponent } from "./component";

export function createRenderer(options) { // options 不同平台传入的不同， 我们core中不关心options里的api具体是什么 ，只需要调用即可

    let {
        createElement: hostCreateElement,
        insert: hostInsert,
        remove: hostRemove,
        setElementText: hostSetElementText,
        createTextNode: hostCreateNode,
        patchProp: hostPatchProp
    } = options
    const mountElement = (vnode, container,anchor) => {
        // createElm 将虚拟节点变成真实节点
        let { shapeFlag, props, type, children } = vnode;
        // 将真实节点和虚拟节点关联起来
        let el = vnode.el = hostCreateElement(type);

        // 是文本的孩子
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children);
        } else {
            // 数组就需要循环处理
            mountChildren(children, el);
        }
        if (props) {
            // 处理属性,赋予给元素上
            for (let key in props) {
                hostPatchProp(el, key, null, props[key]);
            }
        }
        hostInsert(el, container,anchor);
    }
    function mountChildren(children, container) {
        for (let i = 0; i < children.length; i++) {
            patch(null, children[i], container);
        }
    }
    const patchProps = (oldProps, newProps, el) => {
        if (oldProps !== newProps) {
            for (let key in newProps) {
                const prev = oldProps[key];
                const next = newProps[key];
                if (prev !== next) {
                    hostPatchProp(el, key, prev, next);
                }
            }
            // 老的中的属性 新的没有了 还要将属性移除掉
            for (let key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, oldProps[key], null);
                }
            }
        }
    }
    const patchKeyedChildren = (c1, c2, el) => {
        // 两方都有儿子 核心的diff算法

        // 两个儿子 要尽可能复用
        // 1）abc
        //    abde  i = 2

        // 先默认处理特殊情况
        let i = 0;
        let e1 = c1.length - 1;
        let e2 = c2.length - 1;
        while (i <= e1 && i <= e2) { // 谁先比对完毕就结束
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSameVnodeType(n1, n2)) {
                patch(n1, n2, el); // 递归比较子节点
            } else {
                break;
            }
            i++;
        }
        // 2) abc    i = 0  e1=2  e2=3
        //   eabc    i=0 e1=-1 e2=0
        while(i <= e1 && i <= e2){
            const n1 = c1[e1];
            const n2 = c2[e2];
            if(isSameVnodeType(n1,n2)){
                patch(n1,n2,el);
            }else{
                break;
            }
            e1--;
            e2--;
        }
        // 老的都能复用 只是向前或者向后插入了元素
        // 3) 考虑极端的情况 abc => abcdef （i=3  e1=2  e2= 5）       
        //  abc => fedabc (i=0 e1=-1 e2=2)
        // 我怎么知道是新的比老的多？
        if(i> e1){ // 最起码能保证老节点都比较完毕了
            if(i<=e2){ // 新增的节点
                // 我怎么知道是向前插入 还是向后插入 , 如果是向前插入，那应该插入到谁的前面
                // 如果前面都一样 e2 不会动 取他的 + 1 个 比数组长度大
                // 如果后面都一样 e2 会向前 取他的 + 1 个 会比数组长度小
                const nextPos = e2 + 1;
                const anchor = nextPos < c2.length ? c2[nextPos].el : null
                while(i<=e2){
                    patch(null,c2[i],el,anchor);
                    i++;
                }
            }
            // abcdef abc (i=3 e1=5 e2=2)
        }else if(i>e2){
            while(i<=e1){
                hostRemove(c1[i].el);
                i++;
            }
        }else{
            // 乱序比对 比对两方儿子的差异  最长递增子序列
            // abc   eabcf

            
        }
        // 最后在考虑都不一样的情况
    }
    const patchChildren = (n1, n2, el) => {
        const c1 = n1.children;
        const c2 = n2.children;

        const prevShapeFlag = n1.shapeFlag;
        const nextShapeFlag = n2.shapeFlag;

        // 老的是文本 新的是文本
        // 老的是数组 新的是文本  如果新的是文本 直接覆盖掉即可
        if (nextShapeFlag & ShapeFlags.TEXT_CHILDREN) {
            if (c2 !== c1) {
                hostSetElementText(el, c2);
            }
        } else {
            // 新的是数组   // 如果老的是数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                patchKeyedChildren(c1, c2, el);
            } else {
                // 老的是文本 新的是数组？
                hostSetElementText(el, ''); // 删掉老的内容
                mountChildren(c2, el); // 循环子节点 将子节点变成真实节点插入到el元素中
            }
        }
        // 新的是数组 老的是数组
        // 新的是数组 老的是文本
    }
    const patchElement = (n1, n2, container) => {
        // 比较两个虚拟节点 并且复用老的节点
        let el = n2.el = n1.el
        const oldProps = n1.props || {};
        const newProps = n2.props || {};

        patchProps(oldProps, newProps, el);

        patchChildren(n1, n2, el);
    }
    const mountComponent = (vnode, container) => {

        // vue是组件级别更新的 每个组件应该有个 effect 渲染effect

        // 组件的创建 我拿到外边去

        const instance = vnode.component = createComponentInstance(vnode); // 根据虚拟 创建实例

        // 找到组件的setup方法
        setupComponent(instance); // instance = {type,props,component,render}

        // 设置渲染effect
        setupRenderEffect(instance, container);

    }
    // 每个组件都会提供一个effect方法
    function setupRenderEffect(instance, container) {
        effect(function () { // effect 默认会执行
            if (!instance.isMounted) { // 组件没有被渲染
                let subTree = instance.subTree = instance.render(); // state.name
                // 渲染组件对应的需要渲染的节点
                patch(null, subTree, container);
                instance.isMounted = true; // 表示渲染完了
            } else {
                // 组件的更新 
                let prevTree = instance.subTree;
                let nextTree = instance.render();
                patch(prevTree, nextTree, container)
            }
        })
    }

    const updateComponent = (n1, n2, container) => {

    }
    const processElement = (n1, n2, container,anchor) => {
        if (n1 == null) {
            // 元素挂载
            mountElement(n2, container,anchor);
        } else {
            patchElement(n1, n2, container)
        }
    }
    const processComponent = (n1, n2, container) => {
        if (n1 == null) {
            mountComponent(n2, container);
        } else {
            updateComponent(n1, n2, container)
        }
    }
    const isSameVnodeType = (n1, n2) => {
        return n1.type == n2.type && n1.key == n2.key;
    }
    const patch = (n1, n2, container,anchor = null) => {
        // 同级比对
        // 1.类型不一样 key 不一样不复用
        // 2.复用节点后 比较属性
        // 3.比对孩子 1方 有儿子  2方都有儿子 
        // 4.都有儿子的时候才是真正的dom-diff
        if (n1 && !isSameVnodeType(n1, n2)) {
            hostRemove(n1.el);
            n1 = null; // n1 等于null 表示初始化渲染，把n2 作为了新的虚拟节点
        }

        // 开始渲染
        let { shapeFlag } = n2;

        // 此时我现在判断的是最外层元素，没有到儿子内部
        // 1100     0001  都是1 才是1
        if (shapeFlag & ShapeFlags.ELEMENT) { // 1  可以用& 操作来判断是否包含这个类型
            processElement(n1, n2, container,anchor);
            // 1100   100
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
            processComponent(n1, n2, container)
        }
    }


    const render = (vnode, container) => { // 渲染器逻辑 
        // 初次渲染 没有prevVnode   更新渲染  prevVnode
        patch(null, vnode, container);
    }
    return {
        createApp: createAppApi(render) // 为了方便扩展 我将createAppApi方法改造成了高阶函数方便传入参数
    }

    // 组件渲染 render方法 =》 patch =》 渲染的是组件 => processComponent => mountComponent => 调用组件的setup 并且拿到render函数
    // 元素渲染  patch方法 => processElement => mountElement
}

// 核心包肯定有很多方法