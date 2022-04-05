const fs = require('fs')
const path = require('path')

// open
fs.open(path.resolve(__dirname, 'data.txt'), 'r', (err, fd) => {
  console.log(fd); // 20

  fs.close(fd, (err) => {
    console.log('关闭成功');
  })
})
