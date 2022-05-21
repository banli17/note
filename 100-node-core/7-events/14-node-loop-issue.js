setTimeout(() => {
  console.log('timeout');
}, 0)

setImmediate(() => {
  console.log('immediate');
})

// 上面代码执行顺序不稳定


// 下面代码执行顺序是固定的
const fs = require('fs')
fs.readFile('./1-base.js', () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0)

  setImmediate(() => {
    console.log('immediate');
  })
})
