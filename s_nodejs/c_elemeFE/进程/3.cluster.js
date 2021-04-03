// 集群
// Cluster是利用多核的办法，基于child_process.fork()实现，产生的进程通过IPC通信，进程没有拷贝到父进程空间，而是加入cluster.isMaster标识父进程和子进程

// 每个进程都执行了这个文件，可以想象成缓存cluster将它们连起来通信。通过IPC在主进程和子进程之间传递服务器句柄
// cluster分发连接的两种方式
// - 默认：不适合windows，时间片轮转法(round-robin)，主进程监听端口，收到新连接分发客户端socket句柄 给指定的worker处理，发给谁由内置循环算法决定
// - 主进程创建socket监听端口后，将socket句柄发给worker，连接进来时，有相应的worker接收并处理。理论上性能高，时间上负载不均衡，70%连接被8个里的2个处理，其它进程比较空闲

const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

console.log('hello0')

if (cluster.isMaster) {
    console.log('master')
    // 克隆进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        console.log(`${worker.process.pid} died`)
    })
} else {
    // 能共享TCP连接
    console.log('not master')
    http.createServer((req, res) => {
        res.end('hi')
    }).listen(3000)
}

console.log('hello')