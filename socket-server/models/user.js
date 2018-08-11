const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    //注册时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //最后登录时间
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    //用户名
    username: {
        type: String,
        trim: true,
        unique: true,
        match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        index: true
    },
    salt: String,
    //密码
    password: String,
    //头像
    avatar: {
        type: String
    },
    expressions: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('User',UserSchema)

