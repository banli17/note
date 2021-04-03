// new Vuex.Store({state,getters,actions,mutations})
import { applyMixin } from './mixin';
import ModuleCollection from './module/module-collection';
import { forEachValue } from './util';

export let Vue;

const getState = (store,path) =>{ // store.state 获取的是最新状态 // [a,c]
    return path.reduce((rootState,current)=>{
        return rootState[current];
    },store.state)
}

const installModule = (store, path, module, rootState) => {
    // 状态 我需要将子模块的状态定义在根模块上
    // console.log(rootState) // state.a  state.b

    let namespaced = store._modules.getNamespace(path);

    if (path.length > 0) { // 是子模块
        // 要将子模块定义在父模块之上
        //['a'] ['a','c'] ['b']
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]; // rootState.a
        }, rootState);
        store._withCommiting(()=>{
            Vue.set(parent, path[path.length - 1], module.state); // 新增不存在的属性需要使用set方法
        })
     
        // parent[path[path.length-1]] = module.state; 没有响应式的
    }
    module.forEachMutation((mutation, key) => {
        // store.commit('key',payload)  {key:[fn,fn]}
        store.mutations[namespaced + key] = (store.mutations[namespaced + key] || [])
        store.mutations[namespaced + key].push((payload) => mutation.call(store, getState(store,path), payload))
    })
    module.forEachAction((action, key) => {
        store.actions[namespaced+key] = (store.actions[namespaced+key] || [])
        store.actions[namespaced+key].push((payload) => action.call(store, store, payload))
    });
    module.forEachChildren((childModule, key) => {
        installModule(store, path.concat(key), childModule, rootState)
    });
    module.forEachGetters((getterFn, key) => {
        store.wrapGetters[namespaced+key] = () => {
            return getterFn.call(store,getState(store,path))
        }
    })
    // 所有的模块的getters 默认都会合并到一个对象里 
}

function resetStoreVM(store, state) {
    const computed = {}
    forEachValue(store.wrapGetters, (fn, key) => {
        computed[key] = fn; // 将所有的属性 放到computed中
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    })
   
    store._vm = new Vue({
        data: {
            $$state: state
        },
        computed
    })
    if(store.strict){
        store._vm.$watch(()=>store._vm._data.$$state,()=>{
            console.assert(store._commiting,'在mutation 之外您修改了状态');
        },{sync:true,deep:true}); // watcher执行时异步的
    }
}

export class Store {
    constructor(options) {
        // 可能用户会有嵌套的module 
        // router=>routes=> routeMap
        // options=> 格式化成一个树结构
        this._modules = new ModuleCollection(options) // 自己维护的数据结构
        this.mutations = {}; // 将用户所有模块的mutation 都放到这个对象中
        this.actions = {}; // 将用户所有模块的action 都放到这个对象中
        this.getters = {};
        this.wrapGetters = {}; // 用于存放所有的getters
        let state = options.state // 获取用户状态
        this._subscribes = [];
        this.strict = options.strict;
        this._commiting = false;
        this._withCommiting = function(fn){
            let commiting = this._commiting;
            this._commiting = true;
            fn(); // 修改状态的逻辑
            this._commiting = commiting
        }
        
        // this._vm
        installModule(this, [], this._modules.root, state); // 根据模块 进行收集

        resetStoreVM(this, state);
        // namespaced

        // 默认插件就会被执行 ，而且是从上到下下执行
      
        options.plugins.forEach(plugin=>plugin(this));




    }
    subscribe(fn){
        this._subscribes.push(fn);
    }
    replaceState(newState){ // 虽然我改变了 状态 但是内部代码用的都是之前的状态
        this._withCommiting(()=>{
            this._vm._data.$$state = newState;
        })
    }
    get state() { // 属性访问器 this.$store.state  Object.defineProperty中的getter
        return this._vm._data.$$state
    }
    commit = (type, payload) => { // {changAge:[fn,fn,fn]} 原型方法 $store.commit()
        if (this.mutations[type]) {
            this._withCommiting(()=>{ // commiting = true;
                this.mutations[type].forEach(fn => fn(payload)); // commit后 mutation执行完毕，状态就更新了
            })


            this._subscribes.forEach(fn=>fn({type,payload},this.state));
        }
    }
    dispatch = (type, payload) => {
        if (this.actions[type]) {
            this.actions[type].forEach(fn => fn(payload));
        }
    }
}
// let root = {
//     _raw: {state,mutation,getters,actions,...}
//     _children:{
//         a:{
//             _raw:{state,mutation,getters,actions},
//             _children:{
//                 c:{
//                     _raw:{state,mutation,getters,actions},
//                     _children:{},
//                     state:{xxx}
//                 }
//             },
//             state:aState
//         },
//         b:{
//             _raw:{state,mutation,getters,actions},
//             _children:{

//             },
//             state:bState
//         }
//     },
//     state:rootState
// }


export const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue)
}