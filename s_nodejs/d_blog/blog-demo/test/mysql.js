const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    user: 'root',
    password: '',
    database: 'myblog'
})

con.connect((err, result)=>{
    if(err){
        console.log('数据库连接错误: ',err)
        return
    }
    console.log('数据库连接成功: ',result)
})
