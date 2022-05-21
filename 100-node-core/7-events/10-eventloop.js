setTimeout(() => {
  console.log('s1');
  Promise.resolve().then(() => {
    console.log('p1');
  })
  Promise.resolve().then(() => {
    console.log('p2');
  })
})

setTimeout(() => {
  console.log('s2');
  Promise.resolve().then(() => {
    console.log('p3');
  })
  Promise.resolve().then(() => {
    console.log('p4');
  })
})
// s1 p1 p2 s2 p3 p4
// 每次宏任务完成后 会清空微任务队列
