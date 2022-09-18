import fs from 'fs'
import path from 'path'
import { URL } from 'url'

const __dirname = new URL('.', import.meta.url).pathname

// open
fs.open(path.resolve(__dirname, 'data.txt'), 'r', (err, fd) => {
  console.log(fd); // 20

  fs.close(fd, (err) => {
    console.log('关闭成功');
  })
})
