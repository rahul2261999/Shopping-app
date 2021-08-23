const mongoose = require('mongoose');

const { Schema } = mongoose;
const mobileSchema = new Schema({
  user_id: {
    type: mongoose.isValidObjectId,
    require: true
  },
  phone: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('mobile', mobileSchema);
