const mongoose = require('mongoose')
const Group = require('./../models/group')
const config = require('./../server.config.js')

const randomAvatar = require('./../utils/randomAvatar.js')

exports.connect = () => {
    //连接数据库
    mongoose.connect(config.database,{useNewUrlParser: true}, async err => {
        //判断默认群组是否存在
        if(err){
            console.error(err)
            return process.exit(1)
        }
        const group = await Group.findOne({isDefault: true})
        if(!group){
            const defaultGroup = await Group.create({
                name: '六度',
                avatar: randomAvatar(),
                announcement: 'welcome',
                isDefault: true
            })
        }
    })
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
            console.log('数据库连接成功')
            resolve()
        })
    })
}