const {SuccessModel, ErrorModel} = require('../model/msgModel')
const {getList, getDetail, addBlog, updateBlog, delBlog} = require('../controller/blog')
const url = require('url')

const handleBlogRouter = async (req, res) => {
    const method = req.method
    const isAdmin = req.query.isAdmin

    if (method === 'GET' && req.pathname === '/api/blog/list') {
        let author = req.query.author
        if (isAdmin) {
            author = req.session.username
        }
        const result = await getList(req.query.title, author)
        return new SuccessModel(result)
    }
    if (method === 'GET' && req.pathname === '/api/blog/detail') {
        const data = await getDetail(req.query.id)
        console.log('data', data)
        return new SuccessModel(data)
    }
    if (method === 'POST' && req.pathname === '/api/blog/add') {
        const data = await addBlog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })
        return new SuccessModel(data)
    }
    if (method === 'POST' && req.pathname === '/api/blog/update') {
        const data = await updateBlog({
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            author: 'banli17'
        })
        if (data) {
            return new SuccessModel(data)
        } else {
            return new ErrorModel(data)
        }
    }
    if (method === 'POST' && req.pathname === '/api/blog/del') {
        const data = await delBlog(req.body.id)
        if (data) {
            return new SuccessModel(data)
        } else {
            return new ErrorModel(data)
        }
    }
}

module.exports = handleBlogRouter