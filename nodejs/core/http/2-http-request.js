import http from 'http'

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
}

const req = http.request(options, (res) => {

  res.on('data', (data) => {
    console.log('data', data.toString())
  })
  res.on('error', (err) => {
    console.log('error', err)
  })
})

const data = JSON.stringify({
  name: '张三',
  age: 12,
})
req.write(data)
req.end()
