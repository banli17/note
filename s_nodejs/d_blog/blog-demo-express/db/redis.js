const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            try {
                resolve(JSON.parse(result))
            } catch (e) {
                resolve(result)
            }
        })
    })
}

module.exports = redisClient