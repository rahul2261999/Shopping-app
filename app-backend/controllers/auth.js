const jwt = require("jsonwebtoken")
const User = require("../models/user/user")
const {validationResult} = require("express-validator")
const {errorHandler}  = require('./helperFunction/helper')


exports.signUp = (req,res) => {
    const error = validationResult(req)
    
    if(!error.isEmpty()){
       return res.status(400).json({error:error.array()[0].msg})
    }
    
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err||user){
          return errorHandler(res,{error:err,data:user,msg:"User already registerd with this email"})
        }
        const newUser = new User(req.body)
        newUser.save((err,user)=>{
            if(err){
            return errorHandler(res,{error:err})
            }
            const {_id,first_name,last_name,email,isEmailVerified} = user
            res.json({_id,first_name,last_name,email,isEmailVerified})
        })
    })
}

exports.signIn =  (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
       return res.status(400).json({error:error.array()[0].msg})
    }
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err||!user){
            return errorHandler(res,{error:err,data:!user,msg:"User not found with this email"})
        }
        if(!user.authenticated(req.body.password)){
            return errorHandler(res,{data:true,msg:"Please enter correct password"})
        }
       
        const {_id,first_name,last_name,email} = user

        const token = jwt.sign({_id,first_name,last_name,email},process.env.TOKEN_SECRET,{expiresIn:3600})
        res.json({
            token,
            user:{_id,first_name,last_name,email}})

    })
}

exports.isAdmin = (req,res,next) =>{
    const check = req.user.isAdmin===1
    if(!check){
        return errorHandler(res,{data:!check})
    }
    next()
}