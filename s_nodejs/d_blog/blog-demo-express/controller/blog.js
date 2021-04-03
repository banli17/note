const {exec} = require('../db/mysql')
const getList = async (title, author) => {
    let sql = 'select * from blogs where 1=1 '
    if (title) {
        sql += `and title like '%${title}%'`
    }
    if (author) {
        sql += `and author='${author}'`
    }
    let data = await exec(sql)
    return data
}

const getDetail = async id => {
    const sql = `
        select title,content from blogs where id='${id}'
    `
    let data = await exec(sql)
    return data[0] || {}
}

const addBlog = async ({title, content, author}) => {
    const createTime = new Date().getTime()
    const sql = `
        insert into blogs (title, content, author, create_time) 
        values('${title}', '${content}', '${author}', ${createTime})
    `
    let data = await exec(sql)
    return {
        id: data.insertId
    }
}

const updateBlog = async (id, title, content, author) => {
    const sql = `
        update blogs set title='${title}',content='${content}' where id='${id}' and author='${author}'
    `
    let data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

const delBlog = async (id, author) => {
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    let data = await exec(sql)
    if (data.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog,
}