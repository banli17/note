// 1. 收集视图依赖数据，依赖收集
// 2. 感知数据变化，数据劫持/数据代理
// 3. 数据变化后通知视图，并进行更新，发布订阅模式

let data = {
  stage: 'GitChat',
  course: {
    title: '前端开发进阶',
    author: ['Lucas', 'Rob'],
    publishTime: '2018 年 5 月'
  }
}

const observe = (obj) =>{
  if(!obj || typeof obj !== 'object') return 
  Object.keys(obj).forEach(key=>{
      let currentValue = obj[key]
      observe(currentValue)
      Object.defineProperty(obj, key, {
        get(){
          console.log('get val:', currentValue)
          return currentValue
        },
        set(val){
          console.log('set val:', val)
          currentValue  = val
        }
      })
  })
}
observe(data)
const arrExtend = Object.create(Array.prototype)
const arrMethods = [
  // 会改变原数组
  'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
]
arrMethods.forEach((method)=>{
  const oldMethod = Array.prototype[method]
  Array.prototype[method] = function (...args){
    console.log('hi');
    return oldMethod.apply(this, args)
  }
})

data.course.author.push('Lucy')