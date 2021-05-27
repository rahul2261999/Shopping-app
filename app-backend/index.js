require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    autoReconnect
},(err)=>{
    if (err) throw err
    console.log("mongodb connected successfully")
})


app.listen(port,()=>console.log(`app is running at port ${port}`))