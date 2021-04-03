const express = require('express')
const path = require('path')
const app = express()
const whiteList = ['http://localhost:4000']
app.use((req, res, next) => {
    // 域名没有/
    let {origin} = req.headers
    if (whiteList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Headers', 'name')
        res.setHeader('Access-Control-Allow-Methods', 'PUT')
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Expose-Headers', 'name')
        res.setHeader('name', 'hello')
        res.setHeader('Access-Control-Max-Age', 1)
    }
    if (req.method === 'OPTIONS') {
        res.end()
        return
    }
    next()
})
app.use('/listen', (req, res) => {
    res.end('hello')
})

app.listen(4001)