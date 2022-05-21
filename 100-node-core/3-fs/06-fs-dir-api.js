const fs = require('fs')
const path = require('path')

const newsFile = path.resolve(__dirname, './news.txt')

// 1 access
// mode 应该是值 fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个的按位或组成的掩码
const rwMode = fs.constants.R_OK | fs.constants.W_OK
fs.access(newsFile, rwMode, (err) => {
  if (err) {
    console.log(err);
  } else {
    // windows 新建的文件一般是 rw，没有x
    console.log('有读写权限');
  }
})

// 2 stat
fs.stat(newsFile, (err, statObj) => {
  console.log(err) // 文件不存会报错
  console.log(statObj.size); // 228  字节
  console.log(statObj.isFile()); // true
  console.log(statObj.isDirectory()); // false
})

// 3 mkdir 它相当于是创建 basename 目录
// 父级目录必须存在，否则会报错
// fs.mkdir(path.resolve(__dirname, 'a'), (err) => {
// 	if (!err) {
// 		console.log('目录创建成功');
// 	} else {
// 		console.log(err);
// 	}
// })

fs.mkdir(path.resolve(__dirname, 'a/b/c'), {
  recursive: true, // 递归创建目录
}, (err) => {
  if (!err) {
    console.log('目录创建成功');
  } else {
    console.log(err);
  }
})

// 4 rmdir
// 默认只能删除空的目录  Error: ENOTEMPTY: directory not empty
// recursive: true 可以删除非空目录
fs.rmdir(path.resolve(__dirname, 'a/b'), {
  recursive: true
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('删除成功');
  }
})

// 5 readdir
fs.readdir(path.resolve(__dirname), (err, files) => {
  console.log(files); // 返回一个由文件或目录名组成的数组
})

// 6 unlink 删除文件
const fs = require('fs')
const path = require('path')
fs.unlink(path.resolve(__dirname, 'test1.txt'), (err) => {
  if (err) {
    console.log(err);
  }
  console.log('删除成功');
})
