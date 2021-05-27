const mongoose = require("mongoose")
const schema = mongoose.Schema

const userModel = new schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        default:0
    },
    isEmailVerified:{
        type:Boolean,
    }
})

module.export = mongoose.model("user",userModel)