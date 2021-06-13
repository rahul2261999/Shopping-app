const express = require("express")
const passport = require("passport")
const { isAdmin } = require("../controllers/auth")
const router = express.Router()
const {
    findCategory,
    getAllCategories,
    singleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category')

// param
router.param('cateId',findCategory)

// routes
router.get('/allCategories',passport.authenticate('jwt',{session:false}),isAdmin,getAllCategories);
router.get('/category/:cateId',passport.authenticate('jwt',{session:false}),isAdmin,singleCategory);
router.post('/category/create',passport.authenticate('jwt',{session:false}),isAdmin,createCategory);
router.put('/category/update/:cateId',passport.authenticate('jwt',{session:false}),isAdmin,updateCategory)
router.delete('/category/:cateId',passport.authenticate('jwt',{session:false}),isAdmin,deleteCategory)


module.exports = router