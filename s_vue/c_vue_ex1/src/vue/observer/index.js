import {arrProto} from './array'
import {defineProperty} from '../utils'

class Observer {
  constructor(data) {
    defineProperty(data, '__ob__', this)
    // 如果是对象
    if (Array.isArray(data)) {
      data.__proto__ = arrProto // 修改数组的原型

      this.observeArray(data) // 将数组中的对象变成响应式
    } else {
      this.walk(data) // 将对象变成响应式
    }
  }

  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return
  }
  // 如果已经是响应式，就返回
  if (data.__ob__ instanceof Observer) {
    return data
  }
  return new Observer(data)
}

function defineReactive(data, key, value) {
  observe(value)

  Object.defineProperty(data, key, {
    enumerable: true,
    get() {
      console.log('获取了值', value)
      return value
    },
    set(newValue) {
      if (newValue === value) return
      console.log('设置了新值', newValue)
      observe(newValue)
      // data[key] = newValue 这里会死循环，因为设置了后，里面又设置了
      value = newValue  // 利用闭包，value 不会销毁，获取的时候还是 value
    }
  })
}
