const mongoose = require('mongoose');

const catergorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('categories', catergorySchema);
