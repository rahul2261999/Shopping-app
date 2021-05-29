const express = require("express")
const route = express.Router()
const {getProduct,getAllProducts} = require('../controllers/products')

route.param('/:productId',getProduct)
route.get('/allproducts',getAllProducts)

module.exports = route