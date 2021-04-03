import install from './install'
import createMatcher from './create-matcher'
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";

class VueRouter {
    constructor(options) {
        this.matcher = createMatcher(options.routes)
        console.log(this.matcher)
        this.beforeHooks = []
        // mode history hash abstrict(nodejs)
        options.mode = options.mode || 'hash'
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this)
                break
        }
    }

    match(location) {
        return this.matcher.match(location)
    }

    push(to) {
        this.history.push(to)
    }

    pop() {
        this.history.pop()
    }

    beforeEach(fn) {
        this.beforeHooks.push(fn)
    }

    init(app) {
        const history = this.history

        const setupListeners = () => {
            // 监听变化， hashchange 或 popstate
            history.setupListener()
        }
        // 第一次打开路由页面时，跳转到那个页面去
        // transitionTo 是公共方法，定义到 History 上
        // setupListener getCurrentLocation hash/history 模式下不同，分开定义

        // 每次路由变化时，执行 cb
        history.listen((route) => {
            app._route = route
            console.log('history.listen', app._route)
        })

        history.transitionTo(
            history.getCurrentLocation(),
            setupListeners
        )
    }
}

VueRouter.install = install

export default VueRouter

