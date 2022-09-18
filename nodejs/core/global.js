// 注入 __dirname 和 __filename

import path from 'path'
import { createRequire } from 'module'
import { URL } from 'url'

// 这里没有办法，只能获取到 global 的 __dirname 和 __filename
// 不能在每个文件里直接使用, 需要如 resolve('fs/datas.txt')
global.__filename = new URL('', import.meta.url).pathname

global.__dirname = path.dirname(__filename)

// global.require = createRequire(import.meta.url)

global.l = console.log

global.resolve = (...args) => {
  return path.resolve(__dirname, ...args)
}
