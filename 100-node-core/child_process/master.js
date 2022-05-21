const cp = require('child_process')

const child = cp.fork(__dirname + '/child.js')

child.send('hi')

child.on('message', (data) => {
    console.log('master data', data);
})