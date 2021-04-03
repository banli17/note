const url = require('url')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {exec} = require('./src/db/mysql')
const {set, get} = require('./src/db/redis')
const {log} = require('./src/utils/log')

// const SESSION_DATA = {}
const bodyParser = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (!req.headers['content-type'].includes('application/json')) {
            resolve({})
            return
        }
        let postData = []
        req.on('data', chunk => {
            postData.push(chunk)
        })
        req.on('end', () => {
            const data = Buffer.concat(postData).toString()
            if (!data) {
                resolve({})
                return
            }
            resolve(JSON.parse(data))
        })
    })
    return promise
}

function getCookies(req) {
    let cookies = {}
    req.headers.cookie && req.headers.cookie.split(';').map((kv) => {
        let [key, value] = kv.split('=')
        cookies[key.trim()] = value.trim()
    })
    return cookies
}


const getCookieExpires = () => {
    const d = new Date()
    d.setTime(new Date().getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()
}

const serverHandle = async (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8')

    // 日志
    log(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 处理 get 参数
    req.query = url.parse(req.url, true).query
    req.pathname = url.parse(req.url).pathname
    // 处理 post 参数
    req.body = await bodyParser(req)
    req.cookies = getCookies(req)

    // 处理session,存userId
    let userId = req.cookies.userId
    let needSetSession = false
    if (userId) {
        let session = await get(userId)
        // if (!SESSION_DATA[userId]) {
        //     SESSION_DATA[userId] = {}
        // }
        if (!session) {
            set(userId, {})
        }
    } else {
        needSetSession = true
        userId = `${Date.now()}_${Math.random()}`
        // SESSION_DATA[userId] = {}
        set(userId, {})
    }
    // req.session = SESSION_DATA[userId]
    req.sessionId = userId
    req.session = await get(userId)

    // console.log('SESSION_DATA', SESSION_DATA)
    // 处理博客
    const blogData = await handleBlogRouter(req, res)
    if (blogData) {
        if (needSetSession) {
            res.setHeader('Set-Cookie', `userId=${req.sessionId}; path=/;expires=${getCookieExpires()}; httpOnly`)
        }
        res.end(JSON.stringify(blogData))
    }

    // 处理用户
    const userData = await handleUserRouter(req, res)
    if (userData) {
        if (needSetSession) {
            res.setHeader('Set-Cookie', `userId=${req.sessionId}; path=/;expires=${getCookieExpires()}; httpOnly`)
        }
        res.end(JSON.stringify(userData))
    }

    res.statusCode = '404'
    res.end('404 not fount')

}

module.exports = serverHandle
