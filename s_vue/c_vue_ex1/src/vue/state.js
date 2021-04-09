import {isFunction, proxy} from './utils'
import {observe} from './observer'

export function initState(vm) {
  const opts = vm.$options

  if (opts.props) initProps(vm)
  if (opts.methods) initMethods(vm)
  if (opts.data) initData(vm)
  if (opts.computed) initComputed(vm)
  if (opts.watch) initWatch(vm)
}

function initProps(vm) {

}

function initMethods(vm) {

}

function initData(vm) {
  console.log('initData', vm)
  let {data} = vm.$options
  vm._data = data = isFunction(data) ? data.call(vm) : data
  for (let key in data) {
    proxy(vm, key, data)
  }
  observe(data)
}

function initComputed(vm) {

}

function initWatch(vm) {

}
