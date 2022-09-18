// 捕获同步错误
process.on('uncaughtException', (e) => {
  console.log('uncaughtException1: ', e)
})

// 捕获 promise 错误
process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection2: ', e)
})

// throw new Error('hello') // uncaughtException1:  Error: hello

//

// setTimeout(() => {
//   throw new Error('hello') // uncaughtException1:  Error: hello
// }, 1000)

// new Promise(() => {
//   throw new Error('hello') // console.log('unhandledRejection2: ', e)
// })

// Promise.reject() // unhandledRejection2:  undefined

Promise.resolve().then(() => {
  throw new Error('hello') // unhandledRejection2:  Error: hello
})


console.log('env', process.env.NODE_ENV)
