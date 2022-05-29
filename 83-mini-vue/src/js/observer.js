class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 判断 data 是否为对象
    if (!data || typeof data !== 'object') {
      return
    }

    // 遍历对象，将所有属性转为 get set
    Object.keys(data).forEach(key => {
      this.defineProperty(data, key, data[key])
    })
  }

  // 转为 get set
  // 第三个参数 val 用于防止使用obj[key]死循环, 闭包保存值
  defineProperty(obj, key, val) {
    let that = this
    this.walk(val) // 如果是一个对象，转为响应式

    // data 的每个属性就会创建一个 dep
    let dep = new Dep() // 负责搜集依赖和发送通知

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (val === newVal) return
        that.walk(newVal) // 重新赋值为一个新对象，转为响应式

        val = newVal
        // 发送通知
        dep.notify()
      }
    })
  }
}
