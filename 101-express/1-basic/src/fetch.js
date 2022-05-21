const http = require('http')

const http_factory = (method) => {
  return (url, data = {}) => {
    return new Promise((resolve, reject) => {
      data = JSON.stringify(data)
      const option = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
      const req = http.request(url, option, (res) => {
        // console.log('res', res);
        const ret = []
        res.on('data', (chunk) => {
          ret.push(chunk)
        })
        res.on('end', () => {
          resolve(JSON.parse(ret.join('').toString()))
        })
      })

      req.on('error', (err) => {
        console.log('error', err);
      })
      req.write(data)
      req.end()
    })
  }
}

const http_get = http_factory('GET')
const http_post = http_factory('POST')

;
(async () => {
  const res = await http_post('http://localhost:9999')
  console.log(res);
})()
