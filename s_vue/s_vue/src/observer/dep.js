// 发布订阅模式
let id = 0  // 每个属性 的 id 相同，防止 {{a.x}} 多次使用时，重复更新

class Dep {
    constructor() {
        this.subs = []
        this.id = id++
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        console.log('this.subs, ', this.subs)
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

Dep.target = null
const stack = []

export function pushTarget(watcher) {
    Dep.target = watcher
    stack.push(watcher) // 可能有 属性watcher 或渲染watcher
}

export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}

export default Dep
