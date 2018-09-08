const assert = require('assert');
const { isValid } = require('mongoose').Types.ObjectId;

//引入数据模型
const Group = require('../models/group.js')
const Socket = require('../models/socket.js')
const Message = require('../models/message.js')

//引入配置文件
const config = require('../server.config.js')

//引入工具函数
const getRandomAvatar = require('../utils/randomAvatar.js')

const getGroupOnlineMembers = async (group) => {
    const sockets = await Socket.find({user: group.members},{os: 1,browser: 1,environment: 1,user: 1}).populate('user',{username: 1,avatar: 1})
    const filterSockets = sockets.reduce((result,socket) => {result[socket.user] = socket;return result},{})
    return Object.values(filterSockets)
}

module.exports = {
    //创建群组
    async createGroup(ctx){
        const { name } = ctx.data;
        assert(name,"群组名不能为空");
        const group = await Group.findOne({name})
        assert(!group,"该群组已存在")
        let newGroup = null;
        try{
            newGroup = await Group.create({
                name,
                avatar: getRandomAvatar(),
                creator: ctx.socket.user,
                members: [ctx.socket.user]
            })
        }catch(error){
            if(error.name === 'ValidationError'){
                return '群组名包含不支持的字符或长度超过限制'
            }
            throw error
        }
        ctx.socket.socket.join(newGroup._id)
        ctx.body = { success: true, message: '创建成功' }
    },
    //加入群组
    async joinGroup(ctx){
        const { groupId } = ctx.request.body;
        assert(isValid(groupId),"无效的群组ID")
        const group = await Group.findOne({_id: groupId})
        assert(group,"群组不存在")
        assert(group.members.indexOf(ctx.socket.user) === -1,"你已经在群组中")
        group.members.push(ctx.socket.user)
        await group.save()
        const messages = await Message.find({toGroup: groupId},{type: 1,content: 1,createTime: 1},{sort: {createTime: -1},limit: 3}).populate('from',{username: 1,avatar: 1})
        message.reverse()
        ctx.socket.socket.join(group._id)
        ctx.body = {success: true,message: '加入成功'}
    },
    //退出群组
    async leaveGroup(ctx){
        const { groupId } = ctx.request.body
        assert(isValid(groupId),'无效的群组ID')
        const group = await Group.findOne({_id: groupId})
        assert(group,'群组不存在')
        if(group.creator){
            assert(group.creator.toString() !== ctx.socket.user.toString(),"群组不可以退出自己创建的群")
        }
        const index = group.members.indexOf(ctx.socket.user)
        assert(index !== -1,"你不在群组中")
        group.members.splice(index,1)
        await group.save()
        ctx.socket.socket.leave(group._id)
        ctx.body = {success: true,message: '退出成功'}
    },
    //获取群组在线成员列表
    async getGroupOnlineMembers(ctx){
        const { groupId } = ctx.request.body
        assert(isValid(groupId),"无效的群组ID")
        const group = await Group.findOne({_id: groupId})
        assert(group,"群组不存在")
        return getGroupOnlineMembers(group)
    },
    async getDefaultGroupOnlineMembers(){
        const group = await Group.findOne({isDefault: true})
        assert(group,"群组不存在")
        return getGroupOnlineMembers(group)
    },
    //改变群组头像
    async changeGroupAvatar(ctx){
        const { groupId, avatar} = ctx.request.body
        assert(isValid(groupId),"无效的群组ID")
        assert(avatar,"头像地址不能为空")
        await Group.update({_id: groupId},{avatar})
        ctx.body = {success: true,message: '修改成功'}
    }
}
