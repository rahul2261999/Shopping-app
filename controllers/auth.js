const jwt = require("jsonwebtoken")
const User = require("../models/user/user")
const {validationResult} = require("express-validator")


exports.signUp = (req,res) => {
    const error = validationResult(req)
    
    if(!error.isEmpty()){
       return res.status(400).json({error:error.array()[0].msg})
    }
    
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err) throw err
        if(user){
           return res.status(400).json({error:'user already exist with this email'})
        }
        const newUser = new User(req.body)
        newUser.save((err,user)=>{
            if(err){
            return res.status(400).json({error:'user not able to save'})
            }
            res.json({user})
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
            return res.status(400).json({error:"user not found"})
        }
        if(!user.authenticated(req.body.password)){
            return res.json({user:"user login successfully"})
        }
       
        const {_id,first_name,last_name,email} = user

        const token = jwt.sign({_id,first_name,last_name,email},process.env.TOKEN_SECRET,{expiresIn:3600})
        res.json({
            token,
            user:{_id,first_name,last_name,email}})

    })
}

exports.isAdmin = (req,res,next) =>{
    if(!req.user.isAdmin===1){
        return res.status(400).json({error:'Admin access required'})
    }
    next()

}