//引入模型
const User = require('../models/user.js')
const Group = require('../models/group.js')

module.exports = {
    async search(ctx){
        const { keywords } = ctx.request.body
        if(keywords === '') return
        const users = await User.find({username: {$regex: keywords}},{avatar: 1,username: 1})
        const groups = await Group.find({name: {$regex: keywords}},{avatar: 1,name: 1,members: 1})
        ctx.body = {
            success: true,
            message: {
                users,
                groups: groups.map(group => ({
                    _id: group._id,
                    avatar: group.avatar,
                    name: group.name,
                    members: group.members.length
                }))
            }
        }
    },
}