const express = require('express');
const passport = require('passport');

const route = express.Router();
const {
  getProduct,
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct
} = require('../controllers/products');
const { isAdmin } = require('../controllers/auth');
// params
route.param('productId', getProduct);

// routes
route.get('/allproducts', getAllProducts);
route.post('/addproduct/:userId', passport.authenticate('jwt', { session: false }), isAdmin, createProduct);
route.get('/product/:productId', getProductDetails);
route.put('/product/:productId/:userId', passport.authenticate('jwt', { session: false }), isAdmin, updateProduct);
route.delete('/product/:productId/:userId', passport.authenticate('jwt', { session: false }), isAdmin, deleteProduct);

module.exports = route;
