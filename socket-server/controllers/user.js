const assert = require('assert');//抛错模块
const bcrypt = require('bcrypt');//加密模块
const jwt = require('jwt-simple');//生成 token 模块
const { isValid } = require('mongoose').Types.ObjectId;//

const randomAvatar = require('./../utils/randomAvatar')

//引入数据模型
const User = require('../models/user')
const Group = require('../models/group')
const Socket = require('../models/socket')
const Friend = require('../models/friend')
const Message = require('../models/message')

//引入配置文件
const config = require('../server.config')

/**
 * 
 * @param {user} user 用户 
 * @param {Object} environment 客户端信息
 */
function generateToken(user,environment){
    return jwt.encode({
        user,
        environment,
        expires: Date.now() + config.tokenExpiresTime
    })
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
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        let newUser = null;
        try{
            newUser = await User.create({
                username,
                password,
                salt,
                avatar: randomAvatar()
            })
        }catch(err){
            if(err.name === 'ValidationError'){
                return '用户名包含不支持的字符或长度超过限制'
            }
            throw err
        }

        defaultGroup.members.push(newUser)
        await defaultGroup.save()

        const token = generateToken(newUser._id,environment)

        ctx.cookies.user = newUser._id
        await Socket.update({id: ctx.socket.id},{user: newUser._id,os,browser,environment})

        return {
            _id: newUser._id,
            avatar: newUser.avatar,
            username: newUser.username,
            groups: [{
                _id: defaultGroup._id,
                name: defaultGroup.name,
                avatar: defaultGroup.avatar,
                creator: defaultGroup.creator,
                createTime: defaultGroup.createTime,
                message: []
            }],
            friends: [],
            token,
            isAdmin: false
        }
    },
    async login(ctx) {
        assert(!ctx.socket.user, '你已经登录了')
        const { username,password,os,browser,environment } = ctx.request.body
        assert(username, '用户名不能为空')
        assert(password, '密码不能为空')
        const user = await User.findOne({ username })
        assert(!user, '该用户不存在')
        const isPasswordCorrect = bcrypt.compareSync(password,user.password);
        assert(isPasswordCorrect, '密码错误')
        user.lastLoginTime = Date.now()
        await user.save()
        const groups = await Group.find({members: user},{_id:1,name: 1,avatar: 1,creator: 1,createTime: 1})
        groups.forEach( group => {
            ctx.socket.socket.join(group._id)
        })
        const friends = await Friend.find({from: user._id}).populate('to',{avatar: 1, username: 1});
        const token = generateToken(user._id, environment);
        ctx.socket.user = user._id;
        await Socket.update({id: ctx.socket.id},{
            user: user._id,
            os,
            browser,
            environment
        })
        return {
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            groups,
            friends,
            token,
            isAdmin: user._id.toString() === config.administrator

        }




       
    },
}