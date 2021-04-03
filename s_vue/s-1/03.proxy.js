let obj = {
    name: {
        name: 'lisi'
    },
    arr: [1, 2, 3]
}

let handler = {
    get(target, key, receiver) {
        console.log('收集依赖', target, key, receiver)
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        console.log('xxx')
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        console.log('触发更新...', key)
        return Reflect.set(target, key, value)
    }
}
// defineProperty 只能对特定属性进行拦截
// 懒代理，只代理第一层
let proxy = new Proxy(obj, handler)

// console.log(proxy.name.name)

// proxy.name.name = 123
// console.log('proxy.name.name', proxy.name.name)

// proxy.arr[3] = 100  // 一次更新，取 length 属性时才变
// proxy.arr[0] = 100  // 一次更新
// proxy.arr.push(100)  // push 会触发2次更新，他会首先添加索引3 arr[3] = 100，然后修改 length

proxy.arr[3] = 100
