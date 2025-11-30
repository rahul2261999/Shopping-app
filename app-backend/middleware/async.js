const logger = require('../utils/logger');

module.exports = (fn) => (req, res, next) => Promise
  .resolve(fn(req, res, next))
  .catch((err) => {
    logger.error({ requestId: req.requestId, err }, 'async handler caught error');
    next(err);
  });


