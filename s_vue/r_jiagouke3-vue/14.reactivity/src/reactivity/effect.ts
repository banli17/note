import { isArray } from "../shared";

export const effect = (fn, options = {}) => {
    // 需要让传递来的fn 变成响应式的effect，数据有变化 这个fn就能重新执行
    const effect = createReactiveEffect(fn); //fn用户传递的函数
    effect();
}
// effect 应该和数据关联起来
// effect1(()=>{
//     state.name
//     effect2(()=>{
//         state.age
//     })
//     state.address
// })

// 默认先调用effect1 内部对state.name取值 ， 把name属性和 activeEffect(effect1) 关联起来
// 调用effect2 内部对state.age取值， 把age 和 activeEffect(effect2) 关联起来
// effect2 执行完毕 activeEffect 指向effect1
// state.address 再次取值 此时关联到了 effect1

// 数据变化effect就会重新执行
// effect(()=>{
//     state.name++;
// })

export let effectStack = []; // 这个栈为了保证当前effect 和属性能对应上
export let activeEffect = null;
let id = 0;
function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return fn(); // 让函数执行, 会执行取值逻辑. 在取值逻辑中可以和effect做关联
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1]
            }
        }

    }
    effect.id = id++;
    return effect;
}
// 某个对象中的  某个属性 依赖了 哪些effect

// {对象:{name:[]}}  // weakMap set
const targetMap = new WeakMap;
// 建立属性 和 effect之间的关联
export function track(target, key) {
    if (activeEffect == undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) { // 枚举
        targetMap.set(target, (depsMap = new Map())); // weakMap 为了解决内存泄漏
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}

const run = (effects) => {
    if (effects) effects.forEach(effect => effect());
}
export function trigger(target, type, key,value) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {// 属性变化了 但是没有依赖 直接跳过即可
        return;
    }
    // 修改
    if(key == 'length' && isArray(target)){
        depsMap.forEach((dep,key)=>{ // 只要改了length就触发
            // 如果改变了 数组长度 那么一定要更新  改变的长度 小于取值的长度
            // 这里是2 收集的   2     1


            // key => {map中的key}  =》 {name:set:[]}
            // 如果你修改的是长度 正好内部也对长度进行了收集 长度也要触发
            if(key == 'length' || key >= value){
                run(dep)
            }
        });
    }else{
        if (key !== undefined) { // 如果有收集过就触发
            let effects = depsMap.get(key);
            run(effects)
        }
    
        switch (type) {
            case 'add': // 添加属性 需要触发length
                if (isArray(target)) {
                    if (parseInt(key) == key) {
                        run(depsMap.get('length')); // 打补丁 ，不更新就手动触发吧
                    }
                }
                break;
    
            default:
                break;
        }
    }
}
// 下次课 vue3计算属性 ref、toRefs , 异步更新原理 虚拟dom原理 vue3 diff算法
// vite 原理
// vue3 实战写一个项目 vue3 + ts 用法
// ts 实战 手写个axios库
// 周日的话咱们开node （2,4） 补课

// node tcp eggjs 进程 单元测试
 