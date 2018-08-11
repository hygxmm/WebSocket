const mongoose = require('mongoose')
const config = require('./../server.config.js')

// mongoose.Promise = global.Promise

exports.connect = () => {
    //连接数据库
    mongoose.connect(config.database)
    //最大重连次数
    let maxConnectTimes = 0;

    return new Promise((resolve,reject) => {
        //数据库d断开连接监听
        mongoose.connection.on('disconnected',() => {
            if(maxConnectTimes < 3){
                maxConnectTimes++
                //断开重连
                mongoose.connect(config.database)
            }else{
                reject()
                throw new Error("数据库故障")
            }
        })
        //数据库出现错误时
        mongoose.connection.on('error',err => {
            console.error(err)
            if(maxConnectTimes < 3){
                maxConnectTimes++
                mongoose.connect(config.database)
            }else{
                reject(err)
                throw new Error('数据库故障')
            }
        })
        //链接打开时
        mongoose.connection.once('open',() => {
            console.log('MongoDB Connected successfully')
            resolve()
        })
    })
}