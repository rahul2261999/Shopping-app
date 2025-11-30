const logger = require('../utils/logger');

function notFound(req, res, next) {
  return res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  logger.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    err
  }, err.message || 'Unhandled error');
  if (status === 400) {
    return res.status(400).json({ error: err.message || 'Bad Request' });
  }
  if (status === 503) {
    return res.status(503).json({ error: 'Service unavailabel try again later' });
  }
  return res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };


