const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user/user');
const logger = require('../utils/logger');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
    logger.debug({ userId: jwt_payload?._id }, 'jwtStrategy invoked');
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        logger.error({ err }, 'jwtStrategy user lookup error');
        return done(err, false);
      }
      if (user) {
        const {
          _id, first_name, last_name, email, isAdmin
        } = user;
        logger.debug({ userId: _id }, 'jwtStrategy user authenticated');
        return done(null, {
          _id, first_name, last_name, email, isAdmin
        });
      }
      logger.warn({ userId: jwt_payload?._id }, 'jwtStrategy user not found');
      return done(null, false);
      // or you could create a new account
    });
  })));
};
