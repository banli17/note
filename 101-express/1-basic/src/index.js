const express = require('express')

const app = express()

app.get('/', (req, res) => {
  console.log(req.query); //
  res.json({
    msg: 'ok'
  })
})
app.post('/', (req, res) => {
  console.log(req.query); //
  res.json({
    msg: 'ok1'
  })
})

// 如何捕获错误
app.listen(9999, () => {
  console.log(`listen on http://localhost:9999`);
})
