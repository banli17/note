# 响应式原理

## Proxy

可以代理的操作

- get
- set
- defineProperty


步骤:

1. 实现 reactive effect, 存在的问题:
  - effect 每次都执行, 需要依赖搜集
2. 如何依赖搜集, handlers 的数据结构是怎么样?
3. 对于属性值为对象的处理? 也要 reactive 化, 问题是
  - 如果 return reactive() , 那么每次返回的对象不同, 在依赖搜集时会有问题
  - 需要 reactivies 缓存，每次返回同一个对象, vue 里针对同一个对象 reactive 返回值是相等的



