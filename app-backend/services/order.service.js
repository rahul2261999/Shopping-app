const _ = require('lodash');
const Order = require('../models/order/order');
const Product = require('../models/product/product');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

async function findOrderById(id) {
  const order = await Order.findById(id).exec();
  if (!order) {
    throw new BadRequestError('No order found');
  }
  logger.debug({ orderId: id }, 'order loaded by id');
  return order;
}

async function createOrder(userId, body) {
  logger.info({ userId }, 'creating order');
  const productsId = body.product_purchased.map((item) => item.product_id);
  const getproductDetails = await Product.find(
    { _id: { $in: productsId } },
    { _id: 1, prod_price: 1 }
  ).exec();
  const modifiedProductObject = getproductDetails.map((prod, index) => {
    const { _id, prod_price } = prod;
    return {
      product_id: _id,
      quantity: body.product_purchased[index].qty,
      total_price: prod_price * body.product_purchased[index].qty
    };
  });
  const totalAmount = modifiedProductObject
    .map((prod) => prod.total_price)
    .reduce((total, price) => total + price, 0);
  const createOrderInput = { ...body, product_purchased: modifiedProductObject, user_id: userId, total_amount: totalAmount };
  const newOrder = new Order(createOrderInput);
  const order = await newOrder.save();
  if (!order) {
    throw new BadRequestError('Order is not placed, Please try gain');
  }
  logger.info({ orderId: order._id, userId }, 'order created');
  return order;
}

async function getUserOrders(userId) {
  const orders = await Order.find(
    { user_id: userId },
    { user_id: 0 }
  )
    .populate({
      path: 'product_purchased.product_id',
      select: 'prod_name prod_price category',
      populate: {
        path: 'category',
        select: 'category_name'
      }
    }).exec();
  if (!orders) {
    throw new BadRequestError('No orders found');
  }
  logger.info({ userId, count: orders.length }, 'user orders fetched');
  return orders;
}

async function cancelOrder(order) {
  await order.deleteOne();
  logger.info({ orderId: order._id }, 'order canceled');
  return { msg: 'Order Canceled Successfully' };
}

async function getAllOrders() {
  const orders = await Order.find()
    .populate({
      path: 'user_id',
      select: 'first_name last_name email'
    })
    .populate({
      path: 'product_purchased.product_id',
      select: 'prod_name prod_price category',
      populate: {
        path: 'category',
        select: 'category_name'
      }
    }).exec();
  logger.info({ count: orders.length }, 'all orders fetched');
  return orders;
}

async function updateOrderStatus(order, body) {
  const updateOrder = _.assign(order, body);
  const saved = await updateOrder.save();
  if (!saved) {
    throw new BadRequestError('Status not updated');
  }
  logger.info({ orderId: order._id, status: body.status }, 'order status updated');
  return { msg: 'Status updated successfully' };
}

module.exports = {
  findOrderById,
  createOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
};


