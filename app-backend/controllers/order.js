const Order = require('../models/order/order')
const Product = require('../models/product/product')
const _ = require("lodash")
const {
    errorHandler
} = require('./helperFunction/helper')

exports.findOrder = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return errorHandler(err, {
                error: err,
                data: !order,
                msg: "No order found"
            })
        }
        req.order = order
        next()
    })
}

exports.createOrder = async (req, res) => {
    const orderDetails = {
        user_id: req.user._id,
        product_purchased: [],
        total_amount: 0,
        shipping_address: req.body.shipping_address,
        permanent_address: req.body.permanent_address,
        delivery: req.body.delivery,
    }

    const productsId = req.body.products.map(item => item.product_id)
    const getproductDetails = await Product.find({
        _id: {
            $in: productsId
        }
    }, {
        _id: 1,
        prod_price: 1
    })
    const productObject = getproductDetails.map((prod, index) => {
        const {
            _id,
            prod_price
        } = prod
        return {
            product_id: _id,
            quantity: req.body.products[index].qty,
            total_price: prod_price * req.body.products[index].qty
        }
    })
    orderDetails.product_purchased = productObject
    orderDetails.total_amount = productObject
        .map(prod => prod.total_price)
        .reduce((total, price) => total + price, 0)
    const newOrder = new Order(orderDetails)
    newOrder.save((err, order) => {
        if (err || !order) {
            return errorHandler(res, {
                error: err,
                data: !order,
                msg: "Order is not placed, Please try gain"
            })
        }
        res.status(200).json(order)
    })
}

exports.getUserOrders = (req, res) => {
    Order.find({
            user_id: req.user._id
        }, {
            user_id: 0
        })
        .populate({
            path: "product_purchased.product_id",
            select: "prod_name prod_price category",
            populate: {
                path: "category",
                select: "category_name"
            }
        })
        .exec((err, order) => {
            if (err, !order) {
                return errorHandler(res, {
                    error: err,
                    data: !order,
                    msg: "No orders found"
                })
            }
            res.status(200).json(order)
        })
}


exports.cancelOrder = (req, res) => {
    const order = req.order
    order.remove((err, prod) => {
        if (err) {
            return errorHandler(res, {
                error: err,
            })
        }
        console.log(prod);
        res.json({
            msg: "Order Canceled Successfully"
        })
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate({
            path: "user_id",
            select: "first_name last_name email"
        })
        .populate({
            path: "product_purchased.product_id",
            select: "prod_name prod_price category",
            populate: {
                path: "category",
                select: "category_name"
            }
        })
        .exec((err, orders) => {
            if (err) {
                return errorHandler(res, {
                    error: err,
                })
            }
            res.status(200).json(orders)
        })
}

exports.updateOrderStatus = (req, res) => {
    const updateOrder = _.assign(req.order,req.body)
    updateOrder.save((err,order)=>{
        if (err||!order) {
            return errorHandler(res, {
                error: err,
                data:!order,
                msg:"Status not updated"
            })
        }
        res.status(200).json({msg:"Status updated successfully"})
    })
}