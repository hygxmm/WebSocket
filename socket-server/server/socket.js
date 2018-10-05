// const Socket = require('./../models/socket')

/**
 * io.emit(foo) 触发所有用户的foo事件
 * socket.emit(foo) 只触发当前用户的foo事件
 * socket.broadcast.emit(foo) 触发除了当前客户端用户的其他用户的foo事件
 */

module.exports = function socket(io,socket,users){
    console.log("客户端连接上啦~")
    console.log(socket.id,"socket ID")
    users.set(socket.id,socket)
    // Socket.create({id: socket.id})
    //接收消息
    socket.on('message',(data) => {
        console.log(data)

    })
    //发送给全部用户
    io.emit('system',)
    //发送给其他用户
    // socket.broadcast.emit()

}