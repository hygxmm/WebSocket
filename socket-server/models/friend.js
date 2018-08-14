const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
    createTime: { type: Date, default: Date.now },
    from: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    to: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Friend', FriendSchema)
