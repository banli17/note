setTimeout(() => {
  console.log('s1');

  Promise.resolve().then(() => {
    console.log('p1');
  })

  process.nextTick(() => {
    console.log('t1');
  })
})

Promise.resolve().then(() => {
  console.log('p2');
})

console.log('start');

setTimeout(() => {
  console.log('s2');

  Promise.resolve().then(() => {
    console.log('p3');
  })

  process.nextTick(() => {
    console.log('t2');
  })
})

console.log('end');

// start end tick p1 s1 setimmediate
// 微任务 nextTick 优先于 promise
// setImmediate 属于 check
