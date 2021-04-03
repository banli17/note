const express = require('express')

const app = express()

app.get('/listen', (req, res) => {
    let {cb, wd} = req.query
    res.end(`${cb}('${wd}')`)
})

app.listen(3001)