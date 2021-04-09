let oldArrayProto = Array.prototype
export let arrProto = Object.create(oldArrayProto)  // 以数组的原型来创建一个对象

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]

methods.forEach(method => {
  arrProto[method] = function (...args) {
    // 拦截
    console.log(`使用了${method}方法`)
    let ob = this.__ob__
    let result = oldArrayProto[method].apply(this, args)
    // 对新增的对象做拦截
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
    }
    if (inserted) ob.observeArray(inserted)

    return result
  }
})

