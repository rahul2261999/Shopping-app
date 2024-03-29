const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const productSchema = new Schema({
  prod_name: {
    type: String,
    required: true
  },
  prod_price: {
    type: Number,
    required: true
  },
  prod_category: {
    type: ObjectId,
    ref: 'categories',
    required: true
  },
  prod_type: {
    type: String,
    required: true
  },
  prod_image: {
    name: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  },
  prod_stock: {
    type: Number,
    required: true,
    default: 0
  },
  prod_description: String

}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);
