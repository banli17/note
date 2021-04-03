const express = require('./express')

const app = express()

app.use(function (req, res, next) {
    console.log('use')
    next()
})
app.use(function (req, res, next) {
    console.log('use1')
    next()
})
app.post('/', (req, res, next) => {
    console.log('post /')
})
app.get('/', (req, res, next) => {
    console.log('get /')
    next()
})

app.get('/aa', (req, res, next) => {
    console.log('get2 /aa')
    res.end('bb')
})

app.get('/bb', (req, res, next) => {
    console.log('get2 /bb')
    res.json('bb')
    // res.end('bb')
})


app.listen(3001, () => {
    console.log(`listening on http://localhost:3001`)
})