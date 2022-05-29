class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb // 回调函数负责更新视图

    // 把 watcher 对象记录到 Dep 类的静态属性
    Dep.target = this
    // 触发 get 方法，在 get 方法中调用 addSub
    this.oldValue = vm[key]
    Dep.target = null
  }

  // 数据变化时更新视图
  update() {
    let newValue = this.vm[this.key]

    if (this.oldValue === newValue) {
      return
    }

    this.cb(newValue)
  }
}
