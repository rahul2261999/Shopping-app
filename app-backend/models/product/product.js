const mongoose = require("mongoose")
const {Schema} = mongoose
const productSchema = new Schema({
    prod_name:{
        type:String,
        required:true
    },
    prod_price:{
        type:String,
        required:true
    },
    prod_stock:{
        type:String,
        required:true
    },
    prod_image:{
        name:Buffer,
        contentType:String
    },
    prod_color:{
        type:String,
    },
    prod_description:String,
    prod_category:{
        type:String
    },
},{timestamps:true})

module.exports = mongoose.model("products",productSchema)