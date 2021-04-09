import Vue from '../index'
import {compileToFunction} from "../compiler";
import {createElm, patch} from "../vdom/patch";

let vm1 = new Vue({data: {name: 'zs'}})
let render1 = compileToFunction(`<div id="a" class="a c">{{name}}</div>`)
let vnode1 = render1.call(vm1)

document.body.appendChild(createElm(vnode1))

let vm2 = new Vue({data: {name: 'ls'}})
let render2 = compileToFunction(`<div id="b" class="b c">{{name}}</div>`)
let vnode2 = render2.call(vm2)

patch(vnode1, vnode2)
