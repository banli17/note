const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('事件1', () => {
  return Promise.resolve().then(() => {
    console.log('事件1执行了');
  })
})
ev.on('事件1', () => {
  console.log('事件2执行了');
})
ev.prependListener('事件1', () => {
  console.log('prepend');
})

ev.emit('事件1')
