export function createRoute(record, location) {
    console.log('record', record)

    let matched = []
    if (record) {
        while (record) {
            matched.unshift(record)
            record = record.parent
        }
    }

    return {
        ...location,
        matched
    }
}

function runQueue(queue, iterator, cb) {
    const step = (index) => {
        if (index >= queue.length) {
            return cb()
        }
        let hook = queue[index]
        iterator(hook, () => step(index + 1))
    }

    step(0)
}

class History {
    constructor(router) {
        this.router = router

        // 视图更新，需要做一个表 /about/a -> matched: [aboutviewRecord, aRecord]，然后将这个数组分别渲染到 router-view 里面去

        // 存放当前路由状态，即 this.$route 的信息
        this.current = createRoute({
            path: '/'
        })
    }

    // 1. 跳转时会调用此方法 from to..
    // 2. 路径变化时，视图更新
    transitionTo(location, onComplete) {
        // console.log(location)
        // 获取当前要跳转的 route 信息
        let route = this.router.match(location)
        // console.log('route', route)

        // 如果路由一样时，点击就不跳转
        if (location === this.current.path && route.matched.length === this.current.matched.length) {
            return
        }

        // 导航守卫
        const iterator = (hook, next) => {
            hook(this.current, route, () => {
                next()
            })
        }
        let queue = [].concat(this.router.beforeHooks)
        runQueue(queue, iterator, () => {
            this.updateRoute(route)

            onComplete && onComplete()
        })
    }

    listen(cb) {
        this.cb = cb
    }

    updateRoute(route) {
        this.current = route
        this.cb && this.cb(route)
        // 路由切换时，模版更新(需要响应式， 模版中用到数据)
        // Vue.util.defineReactive(this, '_route', this._router.history.current)
        // 每次更新完，去修改根实例上的 this._route
    }
}

export default History
