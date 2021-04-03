const {SuccessModel, ErrorModel} = require('../model/msgModel')
const {loginCheck} = require('../controller/user')
const {set, get} = require('../db/redis')

const handleUserRouter = async (req, res) => {
    const method = req.method
    if (method === 'POST' && req.pathname === '/api/user/login') {
        const loginData = await loginCheck(req.body.username, req.body.password)
        if (loginData) {

            // 设置session
            req.session.username = loginData.username
            req.session.realname = loginData.realname
            // 同步redis
            set(req.sessionId, req.session)

            return new SuccessModel(loginData)
        } else {
            return new ErrorModel('登陆失败')
        }
    }

    if (method === 'GET' && req.pathname === '/api/user/login') {
        const loginData = await loginCheck(req.query.username, req.query.password)
        if (loginData) {
            // 设置session
            req.session.username = loginData.username
            req.session.realname = loginData.realname
            return new SuccessModel(loginData)
        } else {
            return new ErrorModel('登陆失败')
        }
    }
}

module.exports = handleUserRouter