import Vue from 'vue'
import Vuex from '../vuex'
// import createLogger from "vuex/dist/logger";

Vue.use(Vuex)

function presist() {
    return function (store) {
        try {
            let data = localStorage.getItem('VUEX_STATE')
            if (data) {
                store.replaceState(JSON.parse(data))
            }
        } catch (e) {
            console.log(e)
        }

        store.subscribe((mutation, state) => {
            console.log(mutation, state)
            localStorage.setItem("VUEX_STATE", JSON.stringify(state))
        })
    }
}

export default new Vuex.Store({
    plugins: [
        // createLogger()
        presist()
    ],
    state: {
        age: 12
    },
    getters: {
        doubleAge: (state) => {
            console.log('doubleAge getters')
            return state.age * 2
        }
    },
    mutations: {
        syncSetAge(state, payload) {
            console.log('syncSetAge')
            state.age += payload
        }
    },
    actions: {
        asyncSetAge({commit}, payload) {
            console.log('asyncSetAge')
            setTimeout(() => {
                commit('syncSetAge', payload)
            }, 1000)
        }
    },
    modules: {
        a: {
            // namespaced: true,     // 没加 namespaced 时，同名 方法会被合并
            state: {
                age: 100
            },
            mutations: {
                syncSetAge(state, payload) {
                    console.log('a syncSetAge')
                    state.age += payload
                }
            },
            modules: {
                c: {
                    namespaced: true,
                    state: {
                        age: 500
                    },
                    mutations: {
                        syncSetAge() {
                            console.log('c syncSetAge')
                        }
                    }
                }
            }
        },
        b: {
            state: {
                age: 200
            }
        }
    }
})
