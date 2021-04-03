import History from "./base";

function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}

function getHash() {
    return window.location.hash.slice(1)  // 不要 #
}

class HashHistory extends History {
    constructor(router) {
        super(router)
        this.router = router  // router 实例

        // 确保hash模式下，有一个 / 路径
        // 即 http://localhost:8080/ -> http://localhost:8080/#/
        ensureSlash()
    }

    // 获取当前页面的 path
    getCurrentLocation() {
        return getHash()
    }

    push(to) {
        this.transitionTo(to, () => {
            // 修改 hash 值
            window.location.hash = to
        })
    }

    // 设置监听, hash 变化时，跳转
    setupListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash())
        })
    }
}

export default HashHistory
