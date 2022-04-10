// point free
// 例子1: Hello World -> hello_world
const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f('Hello World')) // hello_world

// 例子2: 将字符串首字母转为大写，使用. 分割
// world wild web -> W. W. W

const firstLetterToUpper_0 = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
// 优化: 将2次 map 合并
const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

console.log(firstLetterToUpper('world wild web'))
