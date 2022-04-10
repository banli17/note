const _ = require('lodash')

// map 的区别

// _.map 里的 iterator 会接受 3 个参数
console.log(_.map(['23', '8', '10'], parseInt)) // [ 23, NaN, 2 ], 不符合预期
// parseInt('23', 0, arr)
// parseInt('8', 1, arr)
// parseInt('10', 2, arr)


const fp = require('lodash/fp')

// fp.map 里的 iterator 只会接受一个参数
console.log(fp.map(parseInt, ['23', '8', '10'])) // [ 23, 8, 10 ]
