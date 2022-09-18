class BrowserEnv {
  constructor() {
    this.v8 = new V8()
  }
}

class NodeEnv {
  constructor() {
    this.nextTickTasks = []

    this.v8 = new V8()

    this.v8.exec(jsCode) // 执行 js 代码
  }
}

class V8 {
  constructor() {
    this.macroTasks = [main]
    this.microTasks = []
    this.execStack = []

    // 启动事件循环
    this.eventloop()
  }

  eventloop() {
    while (true) {
      this.tick()
    }
  }

  tick() {
    // 1. 执行 nextTick, 没有就跳过
    this.nextTickTasks.forEach((task) => this.exec(task))

    // 2. 执行宏任务, 主任务、setTimeout 等
    // 每次 tick 只取出一个宏任务，就是一段代码
    let macroTask = this.macroTasks.shift()
    this.exec(macroTask)

    // 3. 执行微任务
    let microTask
    while ((microTask = this.microTasks.shift())) {
      this.exec(microTask)
    }
  }

  exec(taskCode) {
    // task 表示一段代码，taskQueue 是将一段代码转成一句句的代码执行
    let taskQueue = this.toTaskQueue(taskCode)

    // 执行每一句代码
    taskQueue.forEach((task) => {
      if (task.type === 'promise' || task.type === 'mutationObserver') {
        this.microTasks.push(task)
      }

      if (task.type === 'setTimeout' || task.type === 'setIntervalCallback') {
        this.macroTasks.push(task)
      }
    })
  }

  // 将代码转成一个可执行任务队列
  toTaskQueue(taskCode) {
    return []
  }
}
