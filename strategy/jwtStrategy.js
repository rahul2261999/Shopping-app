const User = require('../models/user/user')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                const { _id, first_name, last_name, email, isAdmin } = user
                return done(null, { _id, first_name, last_name, email, isAdmin });
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}