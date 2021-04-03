const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }

            resolve(result)
        })
    })
}

con.connect((err, result) => {
    if (err) {
        console.log('数据库连接错误: ', err)
        return
    }
    console.log('数据库连接成功: ', result)
})

module.exports = {
    exec,
    escape: mysql.escape
}