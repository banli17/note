const http = require('http')
const json = require('./1.json')

// node会对.js .json缓存在 require.cache中
// require.cache只是一个指向cache的引用，不是cache本身。
// require.resolve('./1.json') 返回模块标识，绝对路径
// 热更新，清除缓存
http.createServer((req, res) => {
    console.log('json', require.resolve('./1.json'))

    // 清除掉缓存后，重新require。还可以使用VM模块重新执行. 可以采取读取文件的方式，或redis中取
    delete require.cache[require.resolve('./1.json')]
    const json = require('./1.json')
    console.log('json', require.cache)
    res.end(JSON.stringify(json))
}).listen(3001)