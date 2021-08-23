const mongoose = require('mongoose');

const { Schema } = mongoose;
const addressSchema = new Schema({
  user_id: {
    type: mongoose.isValidObjectId
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  addressType: {
    type: String,
    required: true
  }
});

module.export = mongoose.model('address', addressSchema);
