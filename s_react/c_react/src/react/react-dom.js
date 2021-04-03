/**
 * 1. vdom -> 真实 dom
 * 2. vnode 更新同步
 * 3. 把 vdom 的 children 变成真实 dom 挂载到自己 dom 上
 * 4. 把自己挂载到容器
 */
function render(vdom, container) {
    const dom = createDOM(vdom)
    container.appendChild(dom)
}

function mountFunctionComponent(type, props) {
    // type 是那个函数
    let vdom = type(props)
    console.log('mountFunctionComponent', vdom)
    return createDOM(vdom)
}

// 把 vdom -> 真实 dom
function createDOM(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom)
    }
    // react 元素
    let {type, props} = vdom
    let dom
    // 函数组件
    if (typeof vdom.type === 'function') {
        return mountFunctionComponent(type, props)
    } else if (type) {
        dom = document.createElement(type)
    }
    updateProps(dom, props)
    console.log(vdom)
    if (typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children
    } else if (typeof props.children === 'object' && props.children.type) {
        render(props.children, dom)
    } else if (Array.isArray(props.children)) {
        reconcileChildren(props.children, dom)
    } else {
        document.textContent = props.children ? props.children.toString() : ''
    }
    return dom
}

function reconcileChildren(childrenVdoms, parentDOM) {
    console.log(childrenVdoms)
    for (let i = 0; i < childrenVdoms.length; i++) {
        let childrenVdom = childrenVdoms[i]
        if (Array.isArray(childrenVdom)) {
            reconcileChildren(childrenVdom, parentDOM)
        } else {
            render(childrenVdom, parentDOM)
        }
    }
}

function updateProps(dom, newProps) {
    console.log(dom, newProps)
    for (let key in newProps) {
        if (key === 'children') {
            continue
        }
        if (key === 'style') {
            for (let key in newProps.style) {
                dom.style[key] = newProps.style[key]
            }
        } else {
            dom[key] = newProps[key]
        }
    }
}

const ReactDOM = {
    render
}
export default ReactDOM
