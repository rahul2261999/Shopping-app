const logger = require('../utils/logger');

const { v4: uuid } = require('uuid');

module.exports = (req, res, next) => {
  const requestId = uuid();
  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  logger.debug({ requestId }, 'requestId assigned');
  next();
};


