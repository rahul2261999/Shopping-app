const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const { verifyJwtToken } = require('../services/token.service');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

exports.signUp = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.signUp start');
  const error = validationResult(req);

  if (!error.isEmpty()) {
    logger.warn({ requestId: req.requestId, errors: error.array() }, 'controller:auth.signUp validation failed');
    return res.status(400).json({
      error: error.array()[0].msg
    });
  }
  try {
    const result = await authService.signUp(req.body);
    logger.info({ requestId: req.requestId }, 'controller:auth.signUp success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.signUp error');
    return next(err);
  }
};

exports.signIn = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.signIn start');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    logger.warn({ requestId: req.requestId, errors: error.array() }, 'controller:auth.signIn validation failed');
    return res.status(400).json({
      error: error.array()[0].msg
    });
  }
  try {
    const result = await authService.signIn({ email: req.body.email, password: req.body.password });
    logger.info({ requestId: req.requestId }, 'controller:auth.signIn success');
    return res.json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.signIn error');
    return next(err);
  }
};

exports.validateUser = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.validateUser start');
  const { token, payload } = req.user;
  try {
    const result = await authService.validateUserByEmailFromToken(payload, token);
    logger.info({ requestId: req.requestId }, 'controller:auth.validateUser success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.validateUser error');
    return next(err);
  }
};

exports.googleAuthentication = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.googleAuthentication start');
  const { id_token } = req.body;
  try {
    const result = await authService.googleAuthentication(id_token);
    logger.info({ requestId: req.requestId }, 'controller:auth.googleAuthentication success');
    return res.json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.googleAuthentication error');
    return next(err);
  }
};

// middlewares

exports.isAdmin = (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.isAdmin check');
  const check = req.user.isAdmin === 1;
  if (!check) {
    logger.warn({ requestId: req.requestId, userId: req.user?._id }, 'controller:auth.isAdmin denied');
    return next(new BadRequestError('Require admin access'));
  }
  logger.debug({ requestId: req.requestId, userId: req.user?._id }, 'controller:auth.isAdmin ok');
  next();
};

exports.isEmailVerified = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.isEmailVerified start');
  try {
    const result = await authService.resendVerificationEmailIfNotVerified(req.body.email);

    if (result && result.msg) {
      logger.info({ requestId: req.requestId }, 'controller:auth.isEmailVerified resend sent');
      return res.status(200).json(result);
    }
    logger.debug({ requestId: req.requestId }, 'controller:auth.isEmailVerified ok');
    return next();
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.isEmailVerified error');
    return next(err);
  }
};

exports.decodeToken = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.decodeToken start');
  if (req.params.tokenId) {
    try {
      const payload = await verifyJwtToken(req.params.tokenId);
      req.user = { payload, token: req.params.tokenId };
      logger.info({ requestId: req.requestId }, 'controller:auth.decodeToken success');
      return next();
    } catch (err) {
      logger.error({ requestId: req.requestId, err }, 'controller:auth.decodeToken error');
      return next(err);
    }
  } else {
    logger.warn({ requestId: req.requestId }, 'controller:auth.decodeToken invalid request');
    return next(new BadRequestError('Invalid request'));
  }
};

exports.forgotPassword = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.forgotPassword start');
  const { email } = req.body;
  try {
    const result = await authService.forgotPassword(email);
    logger.info({ requestId: req.requestId }, 'controller:auth.forgotPassword success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.forgotPassword error');
    return next(err);
  }
};

exports.setNewPassword = async (req, res, next) => {
  logger.info({ requestId: req.requestId }, 'controller:auth.setNewPassword start');
  const { email, newPassword, confirmPassword } = req.body;
  try {
    const result = await authService.setNewPassword({ email, newPassword, confirmPassword });
    logger.info({ requestId: req.requestId }, 'controller:auth.setNewPassword success');
    return res.json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:auth.setNewPassword error');
    return next(err);
  }
};
