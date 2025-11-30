const jwt = require('jsonwebtoken');
const VerifyToken = require('../models/verifyToken/verifyToken');
const AppError = require('../errors/AppError');
const logger = require('../utils/logger');

function buildUserPayload(user) {
  const {
    _id, first_name, last_name, email, isAdmin
  } = user;
  return { _id, first_name, last_name, email, isAdmin };
}

async function signAuthToken(user) {
  const payload = buildUserPayload(user);
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  logger.debug({ userId: payload._id }, 'auth token signed');
  return token;
}

async function verifyJwtToken(token) {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    logger.debug({ userId: payload._id }, 'jwt token verified');
    return payload;
  } catch (err) {
    logger.warn({ err }, 'jwt verification failed');
    throw new AppError('Invalid request', { statusCode: 400 });
  }
}

async function createAndSaveVerifyToken(user) {
  const token = await signAuthToken(user);
  const saveToken = new VerifyToken({ user: user._id, token });
  await saveToken.save();
  logger.info({ userId: user._id }, 'verification token persisted');
  return token;
}

module.exports = {
  signAuthToken,
  verifyJwtToken,
  createAndSaveVerifyToken
};


