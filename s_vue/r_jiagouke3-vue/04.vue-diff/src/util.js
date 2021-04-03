let callbacks = [];
let waiting = false;

function flushCallbacks() {
    for (let i = 0; i < callbacks.length; i++) {
        let callback = callbacks[i];
        callback();
    }
    waiting = false;
    callbacks = [];
}
// 批处理 第一次开定时器 ，后续只更新列表 ，之后执行清空逻辑

// 1.第一次cb渲染watcher更新操作  （渲染watcher执行的过程肯定是同步的）
// 2.第二次cb 用户传入的回调
export function nextTick(cb) {
    callbacks.push(cb); // 默认的cb 是渲染逻辑 用户的逻辑放到渲染逻辑之后即可
    if (!waiting) {
        waiting = true;
        // 1.promise先看支持不支持 
        // 2.mutationObserver
        // 3.setImmdiate
        // 4.setTimeout  Vue3 next-tick就直接用了promise
        Promise.resolve().then(flushCallbacks); // 多次调用nextTick 只会开启一个promise
    }
}

// nextTick 肯定有异步功能


export const isObject = (val) => typeof val == 'object' && val != null;
const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted'
]

const strats = {};

function mergeHook(parentVal, childVal) {
    if (childVal) { // 如果
        if (parentVal) {
            return parentVal.concat(childVal);
        } else { // 如果儿子有父亲没有
            return [childVal]
        }
    } else {
        return parentVal; // 儿子没有直接采用父亲
    }
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})
strats.components = function(parantVal, childVal) {
    const res = Object.create(parantVal);
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key];
        }
    }
    return res;
}
export function mergeOptions(parent, child) {
    const options = {};
    // {a:1}  {a:2}  => {a:2}
    // {a:1}  {}  => {a:1}
    // 自定义的策略
    // 1.如果父亲有的儿子也有，应该用儿子替换父亲
    // 2.如果父亲有值儿子没有，用父亲的
    for (let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }

    function mergeField(key) {
        // 策略模式
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key]);
        }
        if (isObject(parent[key]) && isObject(child[key])) {
            options[key] = { ...parent[key], ...child[key] }
        } else {
            if (child[key]) { // 如果儿子有值
                options[key] = child[key];
            } else {
                options[key] = parent[key];
            }
        }
    }
    return options;
}


function makeUp(str) {
    const map = {}
    str.split(',').forEach(tagName => {
        map[tagName] = true;
    })
    return (tag) => map[tag] || false
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button,b')