import Vue from 'vue'
import Vuex from '@/vuex' // Vuex 中用install方法
// import logger from 'vuex/dist/logger'
// import VuexPersistence from 'vuex-persist';

// plugins   replaceState  subscribe
class VuexPersistence {
    constructor({ storage }) {
        this.storage = storage;
        this.localName = 'VUEX-MY'
    }
    plugin = (store) => {
        let localState = JSON.parse(this.storage.getItem(this.localName));
        if (localState) {
            store.replaceState(localState); // ****
        }
        store.subscribe((mutationName, state) => {
            this.storage.setItem(this.localName, JSON.stringify(state))
        })
    }
}
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
const logger = () => (store) => {
    let prevState = JSON.stringify(store.state)
    store.subscribe((mutationName, state) => { // 监听变化的 ，每次数据变化都会执行此方法 commit 的时候会执行此方法
        console.log('prev' + prevState);
        console.log(mutationName);
        prevState = JSON.stringify(state);
        console.log('next', prevState)
    })
}
Vue.use(Vuex) // Vuex中是一个对象 对象里有两个 Store  ,install方法

export default new Vuex.Store({ // Store
    strict: true,
    plugins: [ // 插件从上到下执行
      vuexLocal.plugin, // 放在这里 插件默认就会显执行一次
        // logger(),
    ],
    state: { // data
        name: 'zf',
        age: 11, // 父模块的中的属性 不能和子模块的名字相同，会被子模块覆盖掉
    },
    getters: { // computed
        myAge(state) { // this => store
            return state.age + 20
        }
    },
    mutations: {
        changeAge(state, payload) { //
            state.age = state.age + payload
        }
    },
    actions: {
        changeAge({ commit }, payload) {
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000);
        }
    },
    modules: { // store.commit('a/c/xxx');  // store.commit('c/xxx');
        a: {
            namespaced: true,
            state: {
                name: 'jw',
                age: 30
            },
            getters: {
                getName(state) {
                    return state.name
                }
            },
            mutations: {
                changeAge(state, payload) { //
                    state.age = state.age + payload
                }
            },
            modules: {
                c: {
                    namespaced: true,
                    state: {
                        name: 'xxx',
                        age: 40
                    }
                }
            }
        },
        b: {
            namespaced: true,
            state: {
                name: 'zry',
                age: 40
            },
            mutations: {
                changeAge(state, payload) { //
                    state.age = state.age + payload
                }
            }
        }
    }
})