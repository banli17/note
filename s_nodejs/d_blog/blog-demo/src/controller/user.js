const {exec, escape} = require('../db/mysql')
const {genPassword} = require('../utils/cryp')
const loginCheck = async (username, password) => {
    // 防止sql注入
    username = escape(username)

    // 加密
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select username,realname from user where username=${username} and password=${password}
    `
    let data = await exec(sql)
    if (data[0]) {
        return {
            username: data[0].username,
            realname: data[0].realname
        }
    } else {
        return false
    }
}

module.exports = {
    loginCheck
}