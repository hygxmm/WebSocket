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
app.use(convert(logger()))
//配置ctx.body解析中间件
app.use(bodyParser())
//配置静态资源加载中间件
app.use(convert(static(path.join(__dirname,'./../static'))))
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
    io.on('disconnect', () => {
        console.log("客户端断开连接啦~")
    })
})


//启动api监听端口
app.listen(config.api_port, () => {
    console.log(`api server is runing at port ${config.api_port}`)
})

//启动io监听端口
server.listen(config.io_port,() => {
    console.log(`socket server is runing at port ${config.io_port}`)
})