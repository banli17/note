// task 函子, 处理异步任务
const fs = require('fs')
const {
  task
} = require('folktale/concurrency/task')
const {
  split,
  find
} = require('lodash/fp')

function readFile(filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        return resolver.reject(err)
      }
      resolver.resolve(data)
    })
  })
}

readFile(__dirname + '/package.json')
  .map(split('\n'))
  .map(find(x => x.includes('version'))) // 过滤出 version 字段行, 会在 run 读取文件后执行
  .run()
  .listen({
    onRejected: err => {
      console.log(err);
    },
    onResolved: value => {
      console.log(value);
    }
  })
