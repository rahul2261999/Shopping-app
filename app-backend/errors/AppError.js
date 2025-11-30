const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, { statusCode = 500, code } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    // Log creation of application error for traceability
    logger.debug({
      errorName: this.name,
      statusCode: this.statusCode,
      code: this.code,
      message: this.message
    }, 'AppError created');
  }
}

module.exports = AppError;


