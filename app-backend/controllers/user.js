const User = require('../models/user/user');

const { errorHandler } = require('./helperFunction/helper');

exports.getUserDetails = (req, res, next, id) => {
  User.find({ _id: { $in: [id] } }, { encry_password: 0, salt: 0 }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ error: 'network problem' });
    }
    req.profile = user;
    next();
  });
};

exports.getAllUser = (req, res) => {
  User.find({}, { encry_password: 0, salt: 0 }).exec((err, user) => {
    if (err || !user) {
      errorHandler(res, { error: err, data: !user, msg: 'Users not found' });
    }
    res.status(200).json(user);
  });
};
