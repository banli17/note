import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
    let store = new Vuex.Store({
        state: {
            username: 'zhufeng',
            age: 11
        },
        mutations: {
            changeName(state) {
                state.username = 'jw';
            }
        },
        actions: {
            changeName({ commit }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('changeName')
                        resolve()
                    }, 10000);
                });
            }
        }
    })
    // 表示不是服务端渲染  是浏览器渲染
    if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store
}