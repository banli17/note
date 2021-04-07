import {addEvent} from './event'
import {isFunction} from "./utils";

/**
 * 1. vdom -> 真实 dom
 * 2. vnode 更新同步
 * 3. 把 vdom 的 children 变成真实 dom 挂载到自己 dom 上
 * 4. 把自己挂载到容器
 */
function render(vdom, container) {
    const dom = createDOM(vdom)

    container.appendChild(dom)
    if (dom.componentDidMount) {
        dom.componentDidMount()
    }
}

function mountFunctionComponent({type, props}) {
    // type 是那个函数
    let vdom = type(props)
    vdom.oldRenderVdom = vdom;
    return createDOM(vdom)
}

function mountClassComponent(vdom) {
    const {type, props} = vdom
    const classInstance = new type(props)

    if (classInstance.componentWillMount) {
        classInstance.componentWillMount()
    }

    vdom.classInstance = classInstance
    const renderVdom = classInstance.render() // 通过类里的 render 创建 vdom
    // 在实例上和虚拟dom上，挂载一个旧vdom属性，用于以后的比较
    classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom
    const dom = createDOM(renderVdom)
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount
    }
    return dom
}

// 把 vdom -> 真实 dom
export function createDOM(vdom) {
    if (!vdom) return
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom)
    }
    // react 元素
    let {type, props} = vdom
    let dom
    // 函数组件
    if (typeof vdom.type === 'function') {
        // 类组件
        if (type.isReactComponent) {
            return mountClassComponent(vdom)
        }
        // 函数组件
        return mountFunctionComponent(vdom)
    } else if (type) {
        dom = document.createElement(type)
    }
    updateProps(dom, props)
    if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children
    } else if (typeof props.children === 'object' && props.children.type) {
        render(props.children, dom)
    } else if (Array.isArray(props.children)) {
        reconcileChildren(props.children, dom)
    } else {
        document.textContent = props.children ? props.children.toString() : ''
    }
    vdom.dom = dom
    return dom
}

function reconcileChildren(childrenVdoms, parentDOM) {
    for (let i = 0; i < childrenVdoms.length; i++) {
        let childrenVdom = childrenVdoms[i]
        if (Array.isArray(childrenVdom)) {
            reconcileChildren(childrenVdom, parentDOM)
        } else {
            render(childrenVdom, parentDOM)
        }
    }
}

function updateProps(dom, newProps = {}) {
    if (!dom) return
    for (let key in newProps) {
        if (key === 'children') {
            continue
        }
        if (key === 'style') {
            for (let key in newProps.style) {
                dom.style[key] = newProps.style[key]
            }
        } else if (key.startsWith('on')) { // 如果是事件
            // dom[key.toLocaleLowerCase()] = newProps[key];
            addEvent(dom, key.toLocaleLowerCase(), newProps[key])
        } else {
            dom[key] = newProps[key]
        }
    }
}

// 获取虚拟 dom 的真实 dom，真实 dom 挂载在虚拟 dom 上
export function findDOM(vdom) {
    let {type} = vdom;
    let dom;
    if (typeof type === 'function') {//如果是组件的话
        dom = findDOM(vdom.oldRenderVdom);
    } else {///普通的字符串，那说明它是一个原生组件。dom指向真实DOM
        dom = vdom.dom;
    }
    return dom;
}

const ReactDOM = {
    render
}
export default ReactDOM
