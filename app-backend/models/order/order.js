const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const storedProduct = new Schema({
  product_id: {
    type: ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  }

});

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    ref: 'user',
    required: true
  },
  product_purchased: [storedProduct],
  total_amount: {
    type: Number,
    required: true
  },
  customer_details: {
    customer_name: {
      type: String,
      required: true
    },
    customer_mobile: {
      type: Number,
      maxLength: 10
    },
    customer_address: {
      shipping_address: {
        type: String,
        required: true
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
        countryId: String,
        name: String
      },
      zipcode: {
        type: String,
        required: true,
        maxLength: 6

      }
    }

  },
  delivery: {
    type: String,
    required: true
  },
  order_status: {
    type: String,
    default: 'Processing'
  },
  payment_details: {
    transaction_id: String,
    reference_id: String
  }
});

module.exports = mongoose.model('order', orderSchema);
