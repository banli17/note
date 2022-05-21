const {
  EventEmitter
} = require("events");

// class A extends EventEmitter {}

const ev = new EventEmitter()
const f1 = () => {
  console.log('click1 执行了');
}
ev.on('click', f1)

ev.off('click', f1)

ev.on('click', () => {
  console.log('click2 执行了');
})

ev.on('click', () => {
  console.log('click3 执行了');
})

ev.emit('click')

ev.once('upload', function (e) {
  console.log('upload 执行了', e);
  console.log(this)
})
ev.emit('upload', {
  filename: 'x.txt'
})
ev.emit('upload')
