const mongoose = require('mongoose')
const { Schema } = mongoose
const verifyToken = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    token: {
        type: String,
        required: true
    }
},{timestamps:true})


module.exports = mongoose.model('verifytoken', verifyToken)