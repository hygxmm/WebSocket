const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
    //添加时间
    createTime: {
        type: Date,
        default: Date.now
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Friend', FriendSchema)
