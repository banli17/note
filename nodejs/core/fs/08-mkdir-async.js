const fs = require('fs')
const path = require('path')

// 比如创建 a/b/c ，首先对它进行拆分 ['a', 'b', 'c']，然后一个个拼接入 a/ 判断路径是否存在，存在则继续拼接，不存在则先创建，然后继续拼接。
/*
function makeDir(dirPath) {
	const relativePath = path.relative(__dirname, dirPath)
	console.log('relativePath:', relativePath); // relativePath: a/b/c
	const items = relativePath.split(path.sep)
	console.log(path.sep);
	// console.log(items); [ 'a', 'b', 'c' ]

	let i = 1

	function next() {
		let dir = path.resolve(__dirname, items.slice(0, i++).join(path.sep))
		fs.access(dir, (err) => {
			if (err) {
				fs.mkdir(dir, next)
			} else {
				next()
			}
		})
	}

	next()
}
*/

// async 方式
async function makeDir(dirPath) {
  const relativePath = path.relative(__dirname, dirPath)
  console.log('relativePath:', relativePath); // relativePath: a/b/c
  const items = relativePath.split(path.sep)
  console.log(path.sep);
  // console.log(items); [ 'a', 'b', 'c' ]

  const fsPromise = fs.promises
  for (let i = 1; i <= items.length; i++) {
    let dir = path.resolve(__dirname, items.slice(0, i).join(path.sep))
    console.log('dir', dir);
    try {
      await fsPromise.access(dir)
    } catch (e) {
      await fsPromise.mkdir(dir)
    }
  }
}

makeDir(path.resolve(__dirname, 'a/b/c'))
