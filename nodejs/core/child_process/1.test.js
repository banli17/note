console.log('test child pid', process.pid)

// 子进程是拿不到父进程的 process 的
process.on('message', (data) => {
  console.log('get message', data)
  process.disconnect()
})
