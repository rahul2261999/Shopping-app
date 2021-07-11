require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const path = require('path')

const app = express()
const port = process.env.PORT || 3002

// config mongodb

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log("mongodb connected successfully")
})

// config middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname,'./build')))

// config strategy
require('./strategy/jwtStrategy')(passport)

// import routes
const auth = require('./routes/auth')
const user = require('./routes/user')
const product = require('./routes/products')
const category = require('./routes/category')
const order = require('./routes/order')

// config routes
app.use('/api', auth)
app.use('/api', user)
app.use('/api', product)
app.use('/api', category)
app.use('/api', order)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build','index.html'))
})

app.listen(port,()=>console.log(`app is running at port ${port}`))
