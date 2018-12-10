const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const app = new Koa()

const config = require('./../server.config.js')
const routers = require('./../routers/index')
const { connect } = require('./../database/index')

//数据模型
const Socket = require('./../models/socket')
//工具函数
const user = require('../utils/user');
// const socketFn = require('./socket.js')

//跨域配置
app.use(cors())
//配置控制台日志中间件
app.use(logger())
//配置ctx.body解析中间件
app.use(bodyParser())
//配置静态资源加载中间件
app.use(static(path.join(__dirname,'./../static'),{
    maxAge: 1000*60*60*24*7,
    gzip: true
}))
//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

//连接数据库
connect()
//引用 webSocket 中间件 
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

//在线用户列表
const users = new Map()

//客户端连接上的事件
io.on('connection',(socket) => {
    console.log("客户端连接上啦~~")
    
    socket.on('login',(data) => {
        user.login(socket,data)
    })
    socket.on('register',() => {})
    socket.on('',() => {})
    socket.on('',() => {})


    //客户端断开连接
    socket.on('disconnect', () => {
        console.log("客户端断开连接啦~~")
        Socket.remove({id: socket.id})
        users.delete(socket.id)
    })
})



//监听启动端口
server.listen(config.port, () => {
    console.info(`服务启动成功,运行于 ${config.port} 端口`)
})