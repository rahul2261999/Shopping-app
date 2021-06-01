const mongoose = require("mongoose")
const { Schema } = mongoose
const crypto = require("crypto")
const {v4:uuid} = require("uuid")

const userModel = new Schema({
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
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    isAdmin:{
        type:Number,
        default:0
    },

    isEmailVerified:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

userModel.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuid()
    this.encry_password = this.encryptPassword(this._password)
})
.get(function(){
    return this._password
})

userModel.methods= {
    encryptPassword:function(password){
        if(!password) return ""
        try {
            return crypto.createHmac('sha256',this.salt).update("plainpasssword").digest('hex')
        } catch (error) {
            return error
        }
    },
    authenticated:function(password){
        return this.encryptPassword(password)=== this.encry_password
    }

}

module.exports = mongoose.model("user",userModel)