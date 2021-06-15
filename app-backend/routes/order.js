const express = require("express")
const passport = require("passport")
const router = express.Router()
const {isAdmin} = require("../controllers/auth")
const {
    findOrder,
    createOrder,
    getUserOrders,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/order")

// order param
router.param("orderId",findOrder)

// main routes
router.post('/order/create',passport.authenticate("jwt",{session:false}),createOrder)
router.get('/allorders',passport.authenticate("jwt",{session:false}),getUserOrders)
router.delete('/order/:orderId',passport.authenticate("jwt",{session:false}),cancelOrder)

// admin access route

router.get('/admin/allorders',passport.authenticate("jwt",{session:false}),isAdmin,getAllOrders)
router.put('/order/status/:orderId',passport.authenticate("jwt",{session:false}),isAdmin,updateOrderStatus)

module.exports = router