const userService = require('../services/user.service');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

exports.getUserDetails = async (req, res, next, id) => {
  try {
    logger.info({ requestId: req.requestId, id }, 'controller:user.getUserDetails param start');
    const user = await userService.getUserDetailsById(id);
    req.profile = user;
    logger.info({ requestId: req.requestId, id }, 'controller:user.getUserDetails param success');
    return next();
  } catch (err) {
    logger.error({ requestId: req.requestId, err, id }, 'controller:user.getUserDetails param error');
    return next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId }, 'controller:user.getAllUser start');
    const users = await userService.getAllUsers();
    const count = Array.isArray(users) ? users.length : 0;
    logger.info({ requestId: req.requestId, count }, 'controller:user.getAllUser success');
    return res.status(200).json(users);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:user.getAllUser error');
    return next(err);
  }
};
