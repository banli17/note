const toString = Object.prototype.toString

export function isFunction(o) {
  return typeof o === 'function'
}

export function isPlainObject(o) {
  return toString.call(o) === '[object Object]'
}

// 访问 vm.a 时，实际是访问的 vm[key].a
export function proxy(vm, key, target) {
  Object.defineProperty(vm, key, {
    get() {
      return target[key]
    },
    set(value) {
      target[key] = value
    }
  })
}

export function defineProperty(o, key, value) {
  Object.defineProperty(o, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

