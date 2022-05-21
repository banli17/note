const cluster = require('cluster')
const path = require('path')
const os = require('os')

if (cluster.isMaster) {
  const cpuLen = os.cpus().length
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork()

    // 心跳检测，查看服务器是否还活着
    // 隔3s发一个消息，如果超过3次没有回应，就杀掉
    let times = 0
    setInterval(() => {
      console.log('times', times)
      if (times > 3) {
        process.kill(worker.process.pid)
      }

      worker.send('ping')
      times++
    }, 3000)
    worker.on('message', (data) => {
      if (data === 'pong') {
        times--
      }
    })
  }

  cluster.on('exit', code => {
    if (code === 1) {
      setTimeout(() => {
        cluster.fork()
      }, 3000)
    }
  })
} else {
  require(path.join(__dirname, './app'))

  // 未捕获的错误
  process.on('uncaughtException', (err) => {
    console.log(err)
    process.exit(1)
  })

  setInterval(() => {
    console.log(process.memoryUsage().rss)
    if (process.memoryUsage().rss > 734003200) {
      console.log('out of memory')
      process.exit(1)
    }
  }, 5000)
}
