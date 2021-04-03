const {SuccessModel, ErrorModel} = require('../model/msgModel')
const {loginCheck} = require('../controller/user')
const express = require('express')
const router = express.Router()
router.get('/login', async (req,res,next)=>{
    const loginData = await loginCheck(req.query.username, req.query.password)
    console.log(req.query)
    if (loginData) {
        // 设置session
        req.session.username = loginData.username
        req.session.realname = loginData.realname

        console.log(req.session)

        res.json(new SuccessModel(loginData))
    } else {
        res.json(new ErrorModel('登陆失败'))
    }
})

module.exports = router