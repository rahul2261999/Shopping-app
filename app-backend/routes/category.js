const express = require('express');
const passport = require('passport');

const { isAdmin } = require('../controllers/auth');

const router = express.Router();
const asyncHandler = require('../middleware/async');
const {
  findCategory,
  getAllCategories,
  singleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category');

// param
router.param('cateId', findCategory);
// routes
router.get('/allcategories', passport.authenticate('jwt', { session: false }), isAdmin, asyncHandler(getAllCategories));
router.get('/category/:cateId', passport.authenticate('jwt', { session: false }), isAdmin, singleCategory);
router.post('/category/create', passport.authenticate('jwt', { session: false }), isAdmin, asyncHandler(createCategory));
router.put('/category/update/:cateId', passport.authenticate('jwt', { session: false }), isAdmin, asyncHandler(updateCategory));
router.delete('/category/:cateId', passport.authenticate('jwt', { session: false }), isAdmin, asyncHandler(deleteCategory));

module.exports = router;
