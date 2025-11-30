const logger = require('../utils/logger');

const AppError = require('./AppError');

class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, { statusCode: 400 });
    logger.warn({ statusCode: 400, message }, 'BadRequestError');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, { statusCode: 401 });
    logger.warn({ statusCode: 401, message }, 'UnauthorizedError');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, { statusCode: 403 });
    logger.warn({ statusCode: 403, message }, 'ForbiddenError');
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, { statusCode: 404 });
    logger.warn({ statusCode: 404, message }, 'NotFoundError');
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, { statusCode: 409 });
    logger.warn({ statusCode: 409, message }, 'ConflictError');
  }
}

class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailabel try again later') {
    super(message, { statusCode: 503 });
    logger.error({ statusCode: 503, message }, 'ServiceUnavailableError');
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServiceUnavailableError
};
