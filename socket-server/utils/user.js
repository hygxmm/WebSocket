const assert = require('assert');//断言模块
const bcrypt = require('bcrypt');//加密模块
const jwt = require('jwt-simple');//生成token 模块

const User = require('../models/user')


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
}