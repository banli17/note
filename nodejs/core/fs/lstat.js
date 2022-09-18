const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'data.txt')

const res1 = fs.statSync(file)

console.log('1', res1)

const res2 = fs.lstatSync(file)

console.log('2,', res2)

// 上面两个返回的 时间信息 不一样
/**
 1 Stats {
  dev: 16777221,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 66157048,
  size: 7,
  blocks: 8,
  atimeMs: 1659891368181.1055,
  mtimeMs: 1659773910080.8315,
  ctimeMs: 1659773910080.8315,
  birthtimeMs: 1655647348511.154,
  atime: 2022-08-07T16:56:08.181Z,
  mtime: 2022-08-06T08:18:30.081Z,
  ctime: 2022-08-06T08:18:30.081Z,
  birthtime: 2022-06-19T14:02:28.511Z
}
*/
