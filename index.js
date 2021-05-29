require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')

const app = express()
const port = process.env.PORT || 3000

// config mongodb

mongoose.connect(process.env.MONGODB_URL,{
   useNewUrlParser:true,
},(err)=>{
    if (err) throw err
    console.log("mongodb connected successfully")
})

// config middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(passport.initialize())

// config strategy
require('./strategy/jwtStrategy')(passport)

// import routes
const auth = require('./routes/auth')
const user = require('./routes/user')
const product = require('./routes/products')



// config routes
app.use('/api',auth)
app.use('/api',user)
app.use('/api',product)

app.listen(port,()=>console.log(`app is running at port ${port}`))