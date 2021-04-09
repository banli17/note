import {initMixin} from './init'
import {lifecycleMixin} from './lifecycle'
import {renderMixin} from './vdom/index'
import {initGlobalAPI} from './global-api/index'
import {stateMixin} from './state'

function Vue(options) {
    this._init(options)
}

// 混入实例方法
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)

// 混入静态方法
initGlobalAPI(Vue)

// import {compileToFunction} from "./compiler/index";
// import {createElm, patch} from "./vdom/patch";
//
// let vm1 = new Vue({data: {name: 'zs'}})
// let render1 = compileToFunction(`<div>
// <li style="background:red" key="A1">A</li>
// <li style="background:orange" key="B5">B</li>
// <li style="background:yellow" key="C">C</li>
// <li style="background:blue" key="D1">D</li>
// </div>`)
// let vnode1 = render1.call(vm1)
//
// document.body.appendChild(createElm(vnode1))
// let vm2 = new Vue({data: {name: 'ls'}})
// let render2 = compileToFunction(`<div>
// <li style="background:green" key="E1">E</li>
// <li style="background:purple" key="A2">A1</li>
// <li style="background:orange" key="B3">B1</li>
// <li style="background:yellow" key="C">C</li>
// <li style="background:blue" key="D2">D</li>
// </div>`)
// let vnode2 = render2.call(vm2)
//
// setTimeout(() => {
//     console.log('vnode1---------', vnode1)
//     patch(vnode1, vnode2)
// }, 2000)

export default Vue
