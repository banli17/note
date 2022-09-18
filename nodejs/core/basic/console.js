console.log('%o', Number) // 打印 Number 对象
console.log(Number) // [Function: Number]

const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach((fruit) => {
  console.count(fruit)
})
apples.forEach((fruit) => {
  console.count(fruit)
})
// orange: 1
// orange: 2
// just one apple: 1
console.countReset('orange')

oranges.forEach((fruit) => {
  console.count(fruit)
})
// orange: 1
// orange: 2

const function2 = () => console.trace()
const function1 = () => function2()
function1()
// Trace
//     at function2 (file:///Users/banli/Desktop/course/course-nodejs/core/basic/console.js:26:33)
//     at function1 (file:///Users/banli/Desktop/course/course-nodejs/core/basic/console.js:27:25)
//     at file:///Users/banli/Desktop/course/course-nodejs/core/basic/console.js:28:1
//     at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
//     at async Loader.import (internal/modules/esm/loader.js:178:24)
//     at async Object.loadESM (internal/process/esm_loader.js:68:5)

import ProgressBar from 'progress'
const bar = new ProgressBar(':bar', { total: 10 })

const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)
