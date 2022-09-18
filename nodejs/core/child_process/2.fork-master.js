const cp = require('child_process')

const child = cp.fork(__dirname + '/2.fork-child.js')

child.send('hi')

child.on('message', (data) => {
  console.log('master data', data)
})
