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
  new Proxy(obj, {
    get(target, property, value, receiver){
      console.log('p get')
      return Reflect.get(target, property, value, receiver)
    },
    set(target, property, value, receiver){
      console.log('p set')
      return Reflect.set(target, property, value, receiver)
    }
  })
}
observe(data)

data.course.author