const router = require('koa-router')()

const routers = router
    .get('/', ctx => {
        ctx.body = '<h1>123 测试版</h1>'
    })

module.exports = routers