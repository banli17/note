import {nonenumerable} from "core-decorators";

export function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[data][key]
        },
        set(newValue) {
            vm[data][key] = newValue
        }
    })
}

export function defineProperty(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value
    })
}

// 合并策略
const strats = {}
const defaultStrat = strats.data = function (parentVal, childVal) {
    if (childVal) {
        return childVal
    }
    return parentVal
}
strats.components = function (parentVal, childVal) {
    // 先找儿子，再找全局
    const res = Object.create(parentVal)
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res
}

function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal)
        } else {
            return [childVal]
        }
    } else {
        return parentVal
    }
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]

LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
    const options = {}
    // 父有
    for (let key in parent) {
        mergeField(key)
    }

    // 父没有，子有
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        const strat = strats[key] || defaultStrat
        console.log('-----', parent, child, key)
        // 如果是生命周期
        options[key] = strat(parent[key], child[key])
    }

    return options
}

const callbacks = []
let pending = false

function flushCallbacks() {
    // callbacks.forEach(cb => cb())
    // callbacks = []
    while (callbacks.length) {
        let cb = callbacks.pop()
        cb()
    }
    pending = false
}

let timerFunc
if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (MutationObserver) {
    let observer = new MutationObserver(flushCallbacks)
    let textNode = document.createTextNode(1)
    observer.observe(textNode, {characterData: true})
    timerFunc = () => {
        textNode.textContent = 2
    }
} else if (setImmediate) {
    setImmediate(flushCallbacks)
} else {
    setTimeout(flushCallbacks)
}

export function nextTick(cb) {
    console.log('---', cb)
    callbacks.push(cb)
    if (!pending) {
        timerFunc()
        pending = true
    }
}

function makeMap(str) {
    const mapping = {}
    str.split(',').map(item => {
        mapping[item] = true
    })
    return function (key) {
        return mapping[key]
    }
}

// 是否是原生标签
export const isReservedTag = makeMap(
    `a,div,img,text,span,p,button,ul,li,html,body,input,textarea,select`
)
