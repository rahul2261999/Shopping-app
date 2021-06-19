const mongoose = require("mongoose")

const {Schema,ObjectId} = mongoose

const storedProduct = new Schema({
    product_id:{
        type:ObjectId,
        ref:"products",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    total_price:{
        type:Number,
        required:true
    }

})

const orderSchema = new Schema({
    user_id:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    product_purchased:[storedProduct],
    total_amount:{
        type:Number,
        required:true,
    },
    shipping_address:{
        type:String,
        required:true
    },
    permanent_address:{
        type:String,
        required:true,
    },

    delivery:{
        type:String,
        required:true
    },
    order_status:{
        type:String,
        default:"Processing"
    }
})

module.exports = mongoose.model("order",orderSchema)