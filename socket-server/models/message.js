const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//消息模型
const MessageSchema = new Schema({
    //创建时间
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    //
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    //
    to: {
        type: String,
        index: true,
    },
    //类型
    type: {
        type: String,
        enum: ['text', 'image', 'code', 'invite'],
        default: 'text',
    },
    //内容
    content: {
        type: String,
        default: '',
    }
})

module.exports  = mongoose.model('Message', MessageSchema);

