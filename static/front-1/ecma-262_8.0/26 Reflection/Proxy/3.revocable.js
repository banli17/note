let target = {name: 1}
// 创建可撤销的代理对象
let p = Proxy.revocable(target, {
	get(){ return 3}
})

console.log(p)   // { proxy: {}, revoke: [Function: revoke] }
console.log(p.proxy.name) // 3

p.revoke()

// 不能访问代理对象的属性了，报错Cannot perform 'get' on a proxy that has been revoked
// console.log(p.proxy.name)

