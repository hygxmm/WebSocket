const assert = require('assert');//抛错模块
const bcrypt = require('bcrypt');//加密模块
const jwt = require('jwt-simple');//生成 token 模块

//引入数据模型
const User = require('../models/user.js')
const Group = require('../models/group.js')
const Socket = require('../models/socket.js')
const Friend = require('../models/friend.js')
const Message = require('../models/message.js')

//引入配置文件
const config = require('../server.config.js')

//引入工具函数
const randomAvatar = require('./../utils/randomAvatar.js')


/**
 * 生成 token
 * @param {user} user 用户 
 * @param {Object} environment 客户端信息
 */

function generateToken(user,environment){
    return jwt.encode({
        user,
        environment,
        expires: Date.now() + config.tokenExpiresTime
    }, config.privateKey)
}

module.exports = {
    async register(ctx) {
        const {username,password,os,browser,environment} = ctx.request.body;
        assert(username, '用户名不能为空');
        assert(password, '密码不能为空');
        const user = await User.findOne({username});
        assert(!user, '该用户名已存在');
        const defaultGroup = await Group.findOne({isDefault: true})
        assert(defaultGroup, '默认群组不存在');
        const hash = await bcrypt.hash(password,config.encryptionStrength)
        let newUser = null;
        try{
            newUser = await User.create({
                username,
                password: hash,
                avatar: randomAvatar(),
            })
        }catch(err){
            if(err.name === 'ValidationError'){
                return '用户名包含不支持的字符或长度超过限制'
            }
            throw err
        }
        defaultGroup.members.push(newUser)
        await defaultGroup.save()
        ctx.body = { success: true, message: '注册成功' }
    },
    async login(ctx) {
        const { username,password,os,browser,environment } = ctx.request.body
        assert(username, '用户名不能为空')
        assert(password, '密码不能为空')
        const user = await User.findOne({ username })
        assert(user, '该用户不存在')
        const isPasswordCorrect = bcrypt.compareSync(password,user.password);
        assert(isPasswordCorrect, '密码错误')
        user.lastLoginTime = Date.now()
        await user.save()
        //查找与此用户相关联的群组
        const groups = await Group.find({members: user},{_id:1,name: 1,avatar: 1,creator: 1,createTime: 1})
        //查找与此用户相关联的好友
        const friends = await Friend.find({from: user._id}).populate('to',{avatar: 1, username: 1});
        //生成 token
        const token = generateToken(user._id, environment);
        ctx.cookies.set('SESSION', token, {
            domain: 'localhost',
            path: '/',
            maxAge: config.tokenExpiresTime,
            httpOnly: false,
            overwrite: false
        })
        ctx.body = {
            success: true,
            message: '登录成功',
            data: {
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                groups,
                friends
            }
        }
    },
    async loginByToken(ctx){
        const {token,environment} = ctx.request.body;
        assert(token,'token不能为空');
        let payload = null;
        try{
            payload = jwt.decode(token,config.privateKey)
        }catch(err){
            return '非法token'
        }
        assert(Date.now() < payload.expires, 'token已过期')
        assert.equal(environment, payload.environment, '非法登录')
        const user = await User.findOne({_id: payload.user},{_id: 1,avatar: 1,username: 1,createTime: 1})
        assert(user, '用户不存在')
        user.lastLoginTime = Date.now()
        await user.save()
        const groups = await Group.find({members: user},{_id: 1,name: 1,avatar: 1,creator: 1,createTime: 1})
        const friends = await Friend.find({from: user._id}).populate('to',{avatar: 1,username: 1})
        ctx.body = {
            success: true,
            message: '自动登录成功',
            data: {
                id: user._id,
                avatar: user.avatar,
                username: user.username,
                groups,
                friends
            }
        }
    },
    async changeAvatar(ctx){
        const {avatar,user} = ctx
        assert(avatar, '头像链接不能为空')
        await User.update({_id: user,_id},{avatar})
    },
}