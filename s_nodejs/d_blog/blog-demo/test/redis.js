const redis = require('redis')

const redisClient = redis.createClient(6379, 'localhost')
redisClient.on('error', (err) => {
    console.error(err)
})

redisClient.set('name', 'zs', redis.print)

redisClient.get('name', (err, val) => {
    if (err) {
        console.error(err)
        return
    }

    console.log('val ', val)

    // 退出
    redisClient.quit()
})