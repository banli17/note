import { EventEmitter } from 'events'
import '../global.js'

// class A extends EventEmitter {}

const emitter = new EventEmitter()

const f1 = () => {
  console.log('click1 执行了')
}

// 新增事件监听时触发
emitter.on('newListener', (evName, fn) => {
  l('newListener 触发了', evName, fn)
})

emitter.on('removeListener', (evName, fn) => {
  l('removeListener 触发了', evName, fn)
})

// addListener 是 on 的别名
emitter.on('click', f1)

emitter.off('click', f1)

emitter.on('click', () => {
  console.log('click2 执行了')
})

emitter.on('click', () => {
  console.log('click3 执行了')
})

emitter.emit('click')

emitter.once('upload', function (e) {
  console.log('upload 执行了', e)
  console.log(this)
})

emitter.emit('upload', {
  filename: 'x.txt',
})

emitter.emit('upload')

// 返回事件名数组
l(emitter.eventNames())
// [ 'newListener', 'removeListener', 'click' ]

// 获取可以添加到 EventEmitter 对象的最大侦听器数量，默认为 10，但可以使用 setMaxListeners() 增加或减少
l(emitter.getMaxListeners()) // 10
// 是同一个 evName 的函数个数, 超过后控制台会打印警告
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
for (let i = 0; i < 2; i++) {
  emitter.on('a', () => {
    console.log(i)
  })
}


// 获取作为参数传递的事件的侦听器计数，不带参数时为0
l(emitter.listenerCount('a')) // 11

// 获取监听函数数组
l(emitter.listeners('a')) // [[Function].... 11 个]

// 会放在事件函数队列的前面
emitter.prependListener('a', () => {
  console.log('a prepend')
})

// 会放在事件函数队列的前面, 只执行一次
emitter.prependOnceListener('a', () => {
  console.log('a once prepend')
})

emitter.emit('a')

emitter.removeAllListeners()
// removeListener 触发了 newListener [Function (anonymous)]
// removeListener 触发了 click [Function (anonymous)]
// removeListener 触发了 click [Function (anonymous)]
