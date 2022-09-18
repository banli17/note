// 实现 readline 方法

function stepRead(callback) {
  const input = process.stdin
  const output = process.stdout

  let line = ''

  emitKeypressEvents(input)

  function onkeypress(s) {
    output.write(s)
    line += s
    switch (s) {
      case '\r':
        input.pause()
        callback(line)
        break
    }
  }

  input.on('keypress', onkeypress)
  input.setRawMode(true)
  input.resume()
}

function emitKeypressEvents(stream) {
  function onData(chunk) {
    g.next(chunk.toString())
  }
  const g = emitKeys(stream)

  g.next()

  stream.on('data', onData)
}

function* emitKeys(stream) {
  while (true) {
    let ch = yield
    stream.emit('keypress', ch)
  }
}

// stepRead((value) => {
//   console.log('answer:', value)
// })

process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.on('data', (e) => {
  // 输入的内容:  <Buffer 61 61 61 61 61 0a>
  console.log('输入的内容: ', e.toString()) // 只有回车时才会触发，另外不会自动关闭
  if (e.toString() === '\r') {
    process.stdin.pause() // 退出，注意不是 close 方法
  }
})
