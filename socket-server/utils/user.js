const assert = require('assert');//断言模块
const bcrypt = require('bcrypt');//加密模块
const jwt = require('jwt-simple');//生成token 模块

const config = require('../server.config.js')

const User = require('../models/user')
const Group = require('../models/group')
const Friend = require('../models/friend')

//随机头像
const randomAvatar = require('./randomAvatar.js')


module.exports = {
    async login(socket,data) {
        const { username,password,os,browser,environment } = data;
        const user = await User.findOne({ username })
        assert(user, '该用户不存在')
        const isPasswordCorrect = bcrypt.compareSync(password,user.password);
        assert(isPasswordCorrect, '密码错误');
        user.lastLoginTime = Date.now()
        await user.save()
        //查找与此用户相关联的群组
        const groups = await Group.find({members: user},{_id: 1,name: 1,avatar: 1,creator: 1,createTime: 1})
        //查找与此用户相关联的好友
        const friends = await Friend.find({from: user._id}).populate('to',{avatar: 1, username: 1});
        //生成 token
        // const token = generateToken(user._id, environment);
        socket.emit('login',{
            success: true,
            message: '登录成功',
            data: {
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                groups,
                friends
            }
        })
    },
    async register(socket,data) {
        const {username,password,os,browser,environment} = data;
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
        socket.emit('register',{
            success: true,
            message: '注册成功',
        })
    },
}