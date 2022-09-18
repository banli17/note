import readline from 'readline/promises'
// node 17 支持 promise 版本 readline

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// question 方法会显示第一个参数，然后等待用户的额输入，直到按下回车
// const answer = await rl.question(`what do you think of Node.js?`)

// console.log(`Thank you for you feedback ${answer}`)

// rl.close() // 默认不会自动关闭

// rl.input.on('keypress', (e) => {
//   console.log('keypress', e)
// })

// process.stdin.on('keypress', (e) => {
//   console.log('stdin keypress', e)
// })

// rl.on('line', (input) => {
//   // 在回车 \n \r \r\n 时触发
//   console.log(`Received: ${input}`)
// })

// rl.on('history', (history) => {
//   // history 是一个数组，包含历史的字符, history 改变时触发
//   console.log(`Received: ${history}`)
// })

// close 事件在下面几种情况触发
// - input 流 paused 时触发
// - ctrl+c /ctrl + d 会触发
// - input 受到 end 事件时触发
rl.on('close', () => {
  console.log(`Readline closed.`)
})
rl.on('pause', () => {
  console.log(`Readline paused.`)
})
// input 流恢复时触发
rl.on('resume', () => {
  console.log(`Readline resumed`)
})
// rl.pause() 会停止 input 流
// rl.close() 会关闭 input output 流
