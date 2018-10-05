const router = require('koa-router')()
const userController = require('./../controllers/user')
const systemController = require('./../controllers/system')

const routers = router
    .post('/autoLogin', userController.loginByToken)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/uploadImage', systemController.uploadImage)

module.exports = routers