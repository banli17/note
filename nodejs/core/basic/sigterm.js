setTimeout(() => {
  console.log('hello')
}, 10000)

process.kill(process.pid, 'SIGTERM')
