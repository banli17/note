let l = console.log

let target = {}
let proxy = new Proxy(target, {})

proxy.name = 'proxy'

l(proxy.name)
l(target.name)

target.name = 'target'

l(proxy.name)
l(target.name)
