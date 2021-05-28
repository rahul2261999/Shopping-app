const User = require('../models/user/user')

exports.getUserDetails = (req,res,next,id)=>{
    User.findById(id,{encry_password:0,salt:0}).exec((err,user)=>{
       if(err){
           return res.status(400).json({error:"network problem"})
       }
       req.profile = user
        next()
    })
}