let queue = []

beforeEach((next) => {
    console.log(0, next)
    next()
})
beforeEach((next) => {
    console.log(1, next)
    setTimeout(() => {
        next()
    }, 2000)
})


function beforeEach(fn) {
    queue.push(fn)
}

function runQueue(queue, iterator, cb) {
    const step = (index) => {
        console.log(index, queue.length)
        if (index >= queue.length) return cb()
        let hook = queue[index]
        iterator(hook, () => {
            step(index + 1)
        })
    }
    step(0)
}

// 执行传入的函数
const iterator = (hook, next) => {
    hook(() => {
        next()
    })  // 这里用户会手动调用 next
}
runQueue(queue, iterator, () => {
    console.log('队列运行完成')
})

