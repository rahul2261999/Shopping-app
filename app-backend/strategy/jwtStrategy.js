const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        const {
          _id, first_name, last_name, email, isAdmin
        } = user;
        return done(null, {
          _id, first_name, last_name, email, isAdmin
        });
      }
      return done(null, false);
      // or you could create a new account
    });
  })));
};
