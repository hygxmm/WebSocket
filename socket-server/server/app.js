const Koa = require('koa')
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const app = new Koa()

const config = require('./../server.config.js')
const routers = require('./../routers/index')
const { connect } = require('./../database/index')

//配置控制台日志中间件
app.use(logger())
//配置ctx.body解析中间件
app.use(bodyParser())
//配置静态资源加载中间件
app.use(static(path.join(__dirname,'./../static')))
//连接数据库
connect()
//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

//引用 webSocket 中间件 
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

//客户端连接上的事件
io.on('connection', (socket) => {
    console.log("客户端连接上啦~")
    socket.on('login',data => {

    })
    io.on('disconnect', () => {
        console.log("客户端断开连接啦~")
    })
})

//监听启动端口
server.listen(config.port, () => {
    console.info(`socket server is runing at port ${config.port}`)
})