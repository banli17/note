# 实现简易 Vue

## 1.实现响应式

1. 合并 options
2. initState 初始化状态
   - initProps()
   - initMethods()
   - initData()：
     - 挂载 vm.\_data
     - 设置 vm.a 到 vm.\_data 的代理，可以直接方法 vm.a
     - 将 vm.\_data 变为响应式 defineReactive
       - 如果是对象 observe，
         - 第一层对象新增的数据不用拦截，提供 set 方法，对象新增属性不会拦截
         - 对象重写
       - 如果是数组 observeArray，对新增的数据也要拦截
   - initComputed()
   - initWatch()

## 2. 模版编译为 render 函数

## 3. 依赖搜集

## 4. render 函数执行，生成 vnode

## 5. 对比 vnode 更新 DOM
