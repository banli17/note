const http = require('http')

class Express {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }

    register(path) {
        let info = {}
        if (typeof path === 'function') {
            info.path = '/'
            info.stack = [].slice.call(arguments, 0)
        } else {
            info.path = path
            info.stack = [].slice.call(arguments, 1)
        }
        return info
    }

    use(...args) {
        const layer = this.register(...args)
        this.routes.all.push(layer)
    }

    get(...args) {
        const layer = this.register(...args)
        this.routes.get.push(layer)
    }

    post(...args) {
        const layer = this.register(...args)
        this.routes.post.push(layer)
    }

    match(method, url) {
        let stacks = []
        if (url === 'favicon.ico') {
            return stacks
        }
        let routes = this.routes.all.concat(this.routes[method])
        routes.forEach((route) => {
            if (url.indexOf(route.path) === 0) {
                stacks.push(...route.stack)
            }
        })
        return stacks
    }

    handle(req, res, stack) {
        const next = () => {
            const middleware = stack.shift()
            if (middleware) {
                middleware(req, res, next)
            }
        }
        next()
    }

    callback() {
        return (req, res) => {
            const method = req.method.toLowerCase()
            const routes = this.match(method, req.url)
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
            }
            this.handle(req, res, routes)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => new Express()