export function patch(oldVnode, vnode) {
    // 如果是组件，就创建组件的虚拟节点
    if (!oldVnode) {
        return createElm(vnode);
    }

    let el
    // 如果是初始化， oldVnode 是真实元素
    const isRealElement = oldVnode.nodeType
    if (isRealElement) {
        // 根据 vnode 创建真实 dom 节点
        el = createElm(vnode)

        // 使用新节点替换 oldVnode
        let parentEl = oldVnode.parentNode
        // parentEl.replaceChild(el, oldVnode)

        parentEl.insertBefore(el, oldVnode.nextSibling)  //真实元素插入到老节点后面
        parentEl.removeChild(oldVnode)  //删除老节点

        return el
    } else {
        // 对比两个 vnode，然后更新
        // 1. 标签不同，直接替换
        if (oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
        }

        // 标签一样，内容不一样，文本节点
        if (!oldVnode.tag) {
            if (oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text
            }
            return
        }

        // 标签一样，属性不一样，复用元素，更新属性
        let el = vnode.el = oldVnode.el
        updateProperties(vnode, oldVnode.data)

        // 比较儿子
        let oldChildren = oldVnode.children || []
        let newChildren = vnode.children || []

        if (oldChildren.length > 0 && newChildren.length > 0) {
            // 都有儿子节点
            updateChildren(oldChildren, newChildren, el)
        } else if (oldChildren.length > 0) {
            // 新的没有，老的有
            el.innerHTML = ''
        } else if (newChildren.length > 0) {
            // 新的有，老的没有
            for (let i = 0; i < newChildren.length; i++) {
                let child = newChildren[i]
                // 浏览器有性能优化，不用再文档碎片
                el.appendChild(createElm(child))
            }
        }
    }

}

function isSameVnode(newVnode, oldVnode) {
    return (newVnode.tag === oldVnode.tag) && (newVnode.key === oldVnode.key)
}

function makeIndexByKey(children) {
    let map = {}
    children.forEach((item, index) => {
        map[item.key] = index // {0:A,1:B, 2:C}
    })
    return map
}

function updateChildren(oldChildren, newChildren, parent) {
    let oldStartIndex = 0
    let oldEndIndex = oldChildren.length - 1
    let oldStartVnode = oldChildren[oldStartIndex]
    let oldEndVnode = oldChildren[oldEndIndex]

    let newStartIndex = 0
    let newStartVnode = newChildren[newStartIndex]
    let newEndIndex = newChildren.length - 1
    let newEndVnode = newChildren[newEndIndex]

    let map = makeIndexByKey(oldChildren)
    console.log('map', map)
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 从开始比
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldEndVnode[--oldEndIndex]
        } else if (isSameVnode(newStartVnode, oldStartVnode)) {
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(newEndVnode, oldEndVnode)) {
            // 开始不是同一个节点时有效？ 标签一样key一样 也有效
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // 头尾比  a b c d  -> d c b a
            // a b c d  -> b c d a
            patch(oldStartVnode, newEndVnode)
            // 将老节点移动到末尾元素的后一个
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            newEndVnode = newChildren[--newEndIndex]
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // a b c d  -> d a b c
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
            // 为什么要有 key，为什么不能用 key 做索引?
            // a b c  -> c b a 不能复用元素了，移动 比 创建性能高
            // input 复用会出问题
        } else {
            // 儿子之间没有关系，暴力比对
            // 根据 oldChildren 做一个 map 表
            // 新节点如果不在 oldChildren 里，则插入到 oldStartIndex 最前面
            // 新节点在 oldChildren 里，则将 oldChilren 里的节点移动到指针 oldStartIndex 的前面，并置为 null
            let moveIndex = map[newStartVnode.key]
            console.log(moveIndex, newStartVnode.key)
            if (moveIndex === undefined) {
                // 没有，直接插入到前面
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            } else {
                console.log('xxxx')
                // 有，则移动并替换，最后删除掉不要的
                let moveVnode = oldChildren[moveIndex]
                oldChildren[moveIndex] = null
                parent.insertBefore(moveVnode.el, oldStartVnode.el)
                patch(moveVnode, newStartVnode)
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }

    // 新节点有多的，直接插入
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // 有可能后插入，也有可能前插入
            // parent.appendChild(createElm(newChildren[i]))
            let ele = !newChildren[newEndIndex + 1] ? null : newChildren[newEndIndex + 1].el
            // 如果为 null， insertBefore 会变成 appendChild
            parent.insertBefore(createElm(newChildren[i]), ele)
        }
    }

    // 遍历 oldChilren，删除oldStartIndex oldEndIndex 这个区间的元素
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child = oldChildren[i]
            if (child) {
                // child.remove()
                parent.removeChild(child.el)
            }
        }
    }
}

function createComponent(vnode) {
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) {
        i(vnode)
    }
    if (vnode.componentInstance) {
        return true // 是组件
    }
}

export function createElm(vnode) {
    const {tag, data, children, text, key} = vnode
    if (typeof tag === 'string') {
        // 如果是组件，放在 vm.$el 上
        if (createComponent(vnode)) {
            console.log('vnode.componentInstance', vnode.componentInstance)
            return vnode.componentInstance.$el
        }

        vnode.el = document.createElement(tag)
        updateProperties(vnode)
        children.forEach(child => {
            console.log(vnode.el)
            vnode.el.appendChild(createElm(child))
        })
    } else if (typeof text === 'string') {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}


function updateProperties(vnode, oldProps = {}) {
    let el = vnode.el
    let newProps = vnode.data
    // 新的没有，老的有，删除
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key)
        }
    }
    // 样式处理，老的有，新的没有，删除老的
    let newStyle = newProps.style || {}
    let oldStyle = oldProps.style || {}
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }

    // 新的有，直接更新
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                // console.log('newProps.style, ', newProps.style)
                el.style[styleName] = newProps.style[styleName]
            }
            continue
        } else if (key === 'class') {
            el.className = newProps[key]
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}






















