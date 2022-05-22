const MyPromise = require('./index')


const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功')
    }, 2000)
    // reject('失败')
  })
  .then((res) => {
    console.log('res: ', res);
    // return p1
    return 'ggg'
  }, (err) => {
    console.log(err);
    return 200
  })

p1.then((value) => {
  console.log('then 2', value);
  return new Promise((resolve) => {
    resolve('hello')
  })
}).then((value) => {
  console.log('then 3', value);
})

p1.then().then().then(val => {
  console.log('last', val);
})

const p3 = new MyPromise((resolve) => {
  resolve('p3 x')
})
p3.then().then().then(val => {
  console.log('last', val);
  return 'hi'
})


p3.finally(() => {
  console.log('finally');
}).then((value) => {
  console.log('finally', value);
})
