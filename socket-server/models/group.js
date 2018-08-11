const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //组名
    name: {
        type: String,
        trim: true,
        unique: true,
        match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        index: true,
    },
    //头像
    avatar: {
        type: String
    },
    announcement: {
        type: String,
        default: ''
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Group', GroupSchema)
