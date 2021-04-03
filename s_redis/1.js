const redis = require('redis')

const client = redis.createClient(6379, '127.0.0.1')

client.on('error', (err) => {
    console.log('err', err)
})

// 字符串
client.set('name', '张三', redis.print)
client.get('name', redis.print)

// 哈希
client.hset('person', 'name', '李四', redis.print)
client.hget('person', 'name', redis.print)

// 列表
client.lpush('links', 'a', redis.print)
client.lpush('links', 'b', redis.print)
client.lrange('links', 0, -1, redis.print)

// 集合
client.sadd('tags', 'a', redis.print)

// 如何在 redis 中模拟对象操作
client.hset('person', 'name', 'zfpx', redis.print)
client.hset('person', 'age', 10, redis.print)
client.hset('person', 'home', 'beijing', redis.print)
client.hkeys('person', (err, replies) => {
    console.log(replies)
    let person = {}
    replies.forEach(key => {
        client.hget('person', key, (err, val) => {
            person[key] = val
            console.log(person)
        })
    })
})
