const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//组模型
const GroupSchema = new Schema({
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //名称
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
    //公告
    announcement: {
        type: String,
        default: ''
    },
    //创建人
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //是否默认群
    isDefault: {
        type: Boolean,
        default: false
    },
    //成员
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Group', GroupSchema)
