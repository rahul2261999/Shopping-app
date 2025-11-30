const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const start = process.hrtime.bigint();
  // Request start
  logger.info({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl
  }, 'request start');
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      contentLength: res.getHeader('content-length'),
      durationMs: Math.round(durationMs)
    }, 'request end');
  });
  next();
};


