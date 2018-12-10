const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//会话消息
const SocketSchema = new Schema({
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        unique: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    ip: {
        type: String,
    },
    os: {
        type: String,
        default: '',
    },
    browser: {
        type: String,
        default: '',
    },
    environment: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('Socket', SocketSchema);

