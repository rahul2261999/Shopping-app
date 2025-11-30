const orderService = require('../services/order.service');
const logger = require('../utils/logger');

exports.findOrder = async (req, res, next, id) => {
  try {
    logger.info({ requestId: req.requestId, id }, 'controller:order.findOrder param start');
    const order = await orderService.findOrderById(id);
    req.order = order;
    logger.info({ requestId: req.requestId, id }, 'controller:order.findOrder param success');
    return next();
  } catch (err) {
    logger.error({ requestId: req.requestId, err, id }, 'controller:order.findOrder param error');
    return next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, userId: req.user?._id }, 'controller:order.createOrder start');
    const order = await orderService.createOrder(req.user._id, req.body);
    logger.info({ requestId: req.requestId, orderId: order?._id }, 'controller:order.createOrder success');
    return res.status(200).json(order);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, userId: req.user?._id }, 'controller:order.createOrder error');
    return next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, userId: req.user?._id }, 'controller:order.getUserOrders start');
    const orders = await orderService.getUserOrders(req.user._id);
    logger.info(
      {
        requestId: req.requestId,
        userId: req.user?._id,
        count: Array.isArray(orders) ? orders.length : 0
      },
      'controller:order.getUserOrders success'
    );
    return res.status(200).json(orders);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, userId: req.user?._id }, 'controller:order.getUserOrders error');
    return next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, orderId: req.order?._id }, 'controller:order.cancelOrder start');
    const result = await orderService.cancelOrder(req.order);
    logger.info({ requestId: req.requestId, orderId: req.order?._id }, 'controller:order.cancelOrder success');
    return res.json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, orderId: req.order?._id }, 'controller:order.cancelOrder error');
    return next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId }, 'controller:order.getAllOrders start');
    const orders = await orderService.getAllOrders();
    logger.info(
      {
        requestId: req.requestId,
        count: Array.isArray(orders) ? orders.length : 0
      },
      'controller:order.getAllOrders success'
    );
    return res.status(200).json(orders);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:order.getAllOrders error');
    return next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, orderId: req.order?._id }, 'controller:order.updateOrderStatus start');
    const result = await orderService.updateOrderStatus(req.order, req.body);
    logger.info({ requestId: req.requestId, orderId: req.order?._id }, 'controller:order.updateOrderStatus success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, orderId: req.order?._id }, 'controller:order.updateOrderStatus error');
    return next(err);
  }
};
