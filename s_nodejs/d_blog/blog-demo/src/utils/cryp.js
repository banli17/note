const crypto = require('crypto')

const SECRET_KEY = 'hello'

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function genPassword(password) {
    const str = `password=${password}&secret_key=${SECRET_KEY}`
    return md5(str)
}

console.log(genPassword('123'))

module.exports = {
    genPassword
}

