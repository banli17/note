const fs = require('fs')
const path = require('path')

// 比如创建 a/b/c ，首先对它进行拆分 ['a', 'b', 'c']，然后一个个拼接入 a/ 判断路径是否存在，存在则继续拼接，不存在则先创建，然后继续拼接。

function makeDirSync(dirPath) {
  const relativePath = path.relative(__dirname, `${dirPath}`)
  console.log('relativePath:', relativePath)
  const items = relativePath.split(path.sep)
  console.log(path.sep)
  console.log(items)

  for (let i = 1; i <= items.length; i++) {
    let dir = path.resolve(__dirname, items.slice(0, i).join(path.sep))
    console.log(dir)
    try {
      fs.accessSync(dir)
    } catch (e) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync(path.resolve(__dirname, 'a/b/c'))
