const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//联系人模型
const FriendSchema = new Schema({
    //创建时间
    createTime: { type: Date, default: Date.now },
    //消息发送者
    from: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    //消息目标
    to: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Friend', FriendSchema)
