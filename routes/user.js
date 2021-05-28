const express = require("express")
const route = express.Router()
const {getUserDetails} = require('../controllers/user')

route.param('id',getUserDetails);
route.get('/:id',(req,res)=>{
    res.json({msg:'profile',profiel:req.profile})
})

module.exports = route