const mongoose = require('mongoose');

const { Schema } = mongoose;
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
}, { timestamps: true });

verifyToken.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model('verifytoken', verifyToken);
