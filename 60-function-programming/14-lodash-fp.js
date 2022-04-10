const fp = require('lodash/fp')

// fp 会返回 curry 后的函数，参数：数据置后
const f = fp.flowRight(fp.join('_'), fp.map(fp.toLower), fp.split(' '))

// 需求: HELLO WORLD -> hello-world
console.log(f(['HELLO WORLD']))
