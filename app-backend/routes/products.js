const express = require("express")
const route = express.Router()
const {getProduct,getAllProducts,createProduct} = require('../controllers/products')

route.param('/:productId',getProduct)
route.get('/allproducts',getAllProducts);
route.post('/addproduct',createProduct)

module.exports = route