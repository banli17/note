const express = require('express')

const app = express()

app.use(function (req, res) {
    res.send('hello express!')
})

app.listen(3003, () => {
    console.log('http://localhost:3003')
})
