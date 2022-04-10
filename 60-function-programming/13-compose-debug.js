const _ = require('lodash')

// 调试，将 log 放在组合时每个函数的中间
function log(v) {
  console.log(v)
  return v
}
// 但是log 不知道是哪一步打印的，所以加个标签进行调试
const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})

const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, str) => _.join(str, sep))
const map = _.curry((fn, arr) => _.map(arr, fn))
//
const f = _.flowRight(join('_'), trace('lower后'), map(_.toLower), log, split(' '))

// 需求: HELLO WORLD -> hello-world
console.log(f(['HELLO WORLD']))
