const Koa = require('koa')
const app = new Koa()
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const config = require('./../server.config.js')
const routers = require('./../routers/index')
const { connect } = require('./../database/index')

const router = require('koa-router');

//允许跨域访问
app.use(cors())

// app.get('/', (req, res) => {
//     res.send('lalalalala')
// })
// app.use(router.get('/',function(){
//     this.body = {
//         msg: '99999999'

//     }
// }))
// app.use(cors({
//     origin: '*',
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))
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

// io.use(routers.routes()).use(routers.allowedMethods())

//客户端连接上的事件
io.on('connection', (socket) => {
    console.log("客户端连接上啦~~")
    //用户上线信息
    socket.on('login', data => {
        //用户实例放入一个数组中
        socket.userIndex = users.length;
        socket.nickname = data;
        users.push(data)
        //向所有人发送系统消息
        io.emit("system", data + " 上线啦~")
        onlineNumber()
    })
    socket.on('message', data => {
        socket.broadcast.emit('message', data)
    })
    socket.on('image', data => {
        socket.broadcast.emit('image', socket.nickname, data)
    })
    //断开连接
    socket.on('disconnect', () => {
        //将断开连接的用户从列表中删除
        users.splice(socket.userIndex, 1)
        //通知其他用户下线
        socket.broadcast.emit('system', socket.nickname + "离开了,期待下一次的相遇吧")
        onlineNumber()
    })
})


//监听启动端口
app.listen(config.port,() => {
    console.log(`server is runing at port ${config.port}`)
})