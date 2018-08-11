const router = require('koa-router')()

const home = require('./home')
// const main = require('./main')
const api = require('./api')

// router.get('/',async (ctx) => {
//     console.log("qingqiuzhuye")
//     let cook = ctx.cookies.get('cid')
//     console.log(cook,"89998989-------89898989898")
// })

router.use('/',home.routes(),home.allowedMethods())
router.use('/api',api.routes(),api.allowedMethods())

module.exports = router