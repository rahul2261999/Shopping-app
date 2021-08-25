const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const { v4: uuid } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const { validationResult } = require('express-validator');

const User = require('../models/user/user');
const VerifyToken = require('../models/verifyToken/verifyToken');

const { errorHandler } = require('./helperFunction/helper');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.signUp = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()[0].msg
    });
  }

  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err || user) {
      return errorHandler(res, {
        error: err,
        data: user,
        msg: 'User already registerd with this email'
      });
    }
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return errorHandler(res, {
          error: err
        });
      }
      const {
        _id, first_name, last_name, email, isAdmin
      } = user;
      const token = jwt.sign({
        _id, first_name, last_name, email, isAdmin
      }, process.env.TOKEN_SECRET);
      const saveToken = new VerifyToken({ user: _id, token });
      saveToken.save((err) => {
        if (err) {
          return errorHandler(res, {
            error: err
          });
        }
        const transporter = nodemailer.createTransport({
          host: 'smtp-relay.sendinblue.com',
          port: 587,
          auth: {
            type: 'Login',
            user: process.env.SMPT_USERNAME,
            pass: process.env.SMPT_PASSWORD
          }
        });
        ejs.renderFile(path.resolve('./public') + path.normalize('/html/email.ejs'), {
          user: `${first_name} ${last_name}`,
          email,
          pathname: `${process.env.APP_URL}/user/verify/${token}`
        }, (err, html) => {
          if (err) {
            return res.status(400).json({ msg: err });
          }
          transporter.sendMail({
            from: 'rahulsaini2261999@pepisandbox.com',
            to: email,
            html,
            subject: 'Verify your email'
          }, (err) => {
            if (err) {
              return errorHandler(res, {
                error: err
              });
            }
            return res.status(200).json({ msg: 'Verify email link send to your email' });
          });
        });
      });
    });
  });
};

exports.signIn = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()[0].msg
    });
  }
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err || !user) {
      return errorHandler(res, {
        error: err,
        data: !user,
        msg: 'User not found with this email'
      });
    }
    if (!user.authenticated(req.body.password)) {
      return errorHandler(res, {
        data: true,
        msg: 'Please enter correct password'
      });
    }

    const {
      _id,
      first_name,
      last_name,
      email,
      isAdmin
    } = user;

    const token = jwt.sign({
      _id,
      first_name,
      last_name,
      email,
      isAdmin
    }, process.env.TOKEN_SECRET);
    res.json({
      token,
      user: {
        _id,
        first_name,
        last_name,
        email,
        isAdmin
      }
    });
  });
};

exports.validateUser = (req, res) => {
  const { token, payload } = req.user;
  User.findOne({ email: payload.email }).exec((err, user) => {
    if (err || !user) {
      return errorHandler(res, { error: err, data: !user, msg: 'User not found' });
    }
    if (user.isEmailVerified) {
      return res.status(200).json({ msg: 'User already verified' });
    }
    user.isEmailVerified = true;
    user.save((err) => {
      if (err) {
        return errorHandler(res, { error: err });
      }
      res.status(200).json({
        token,
        user: payload
      });
    });
  });
};

exports.googleAuthentication = async (req, res) => {
  const { id_token } = req.body;
  try {
    const clientData = await googleClient.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID });
    const {
      given_name, family_name, email, email_verified
    } = clientData.payload;
    if (!email_verified) {
      return errorHandler(res, { data: true, msg: 'email is not verified' });
    }
    User.findOne({ email }).exec((err, user) => {
      if (err) {
        return errorHandler(res, { err });
      }
      if (user) {
        const {
          _id, first_name, last_name, email, isAdmin
        } = user;

        const token = jwt.sign({
          _id, first_name, last_name, email, isAdmin
        }, process.env.TOKEN_SECRET);
        return res.json({
          token,
          user: {
            _id,
            first_name,
            last_name,
            email,
            isAdmin
          }
        });
      }
      new User({
        first_name: given_name,
        last_name: family_name,
        email,
        isEmailVerified: email_verified,
        password: uuid()
      }).save((err, user) => {
        if (err || !user) {
          return errorHandler(res, { err, data: !user, msg: 'user not able to login' });
        }
        const {
          _id, first_name, last_name, email, isAdmin
        } = user;

        const token = jwt.sign({
          _id, first_name, last_name, email, isAdmin
        }, process.env.TOKEN_SECRET);
        res.json({
          token,
          user: {
            _id,
            first_name,
            last_name,
            email,
            isAdmin
          }
        });
      });
    });
  } catch (error) {
    return errorHandler(res, { error });
  }
};

// middlewares

exports.isAdmin = (req, res, next) => {
  const check = req.user.isAdmin === 1;
  if (!check) {
    return errorHandler(res, {
      data: !check,
      msg: 'Require admin access'
    });
  }
  next();
};

exports.isEmailVerified = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return errorHandler(res, {
        error: err,
        data: !user,
        msg: 'user not found'
      });
    }
    if (user.isEmailVerified) {
      return next();
    }
    const {
      _id, first_name, last_name, email, isAdmin
    } = user;
    const token = jwt.sign({
      _id, first_name, last_name, email, isAdmin
    }, process.env.TOKEN_SECRET);
    const saveToken = new VerifyToken({ user: _id, token });
    saveToken.save((err, tokenData) => {
      if (err) {
        return errorHandler(res, {
          error: err
        });
      }
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          type: 'Login',
          user: process.env.SMPT_USERNAME,
          pass: process.env.SMPT_PASSWORD
        }
      });
      ejs.renderFile(path.resolve('./public') + path.normalize('/html/email.ejs'), {
        user: first_name.concat(last_name),
        email,
        pathname: `${process.env.APP_URL}/user/verify/${tokenData.token}`
      }, (err, html) => {
        if (err) {
          throw err;
        }
        transporter.sendMail({
          from: 'rahulsaini2261999@pepisandbox.com',
          to: email,
          subject: 'Verify your email',
          html
        }, (err) => {
          if (err) {
            return errorHandler(res, {
              error: err
            });
          }
          res.status(200).json({ msg: 'Verify email link send to your email' });
        });
      });
    });
  });
};

exports.decodeToken = (req, res, next) => {
  if (req.params.tokenId) {
    jwt.verify(req.params.tokenId, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        return errorHandler(res, { data: true, msg: 'Invalid request' });
      }
      req.user = { payload, token: req.params.tokenId };
      next();
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(res, { data: true, msg: 'email not found' });
    }
    const transporter = await nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        type: 'Login',
        user: process.env.SMPT_USERNAME,
        pass: process.env.SMPT_PASSWORD
      }
    });

    const html = await ejs.renderFile(path.resolve('./public') + path.normalize('/html/forgotpass.ejs'),
      {
        email,
        pathname: `${process.env.APP_URL}/user/forgotpassword/?email=${email}`
      });
    await transporter.sendMail({
      from: 'rahulsaini2261999@pepisandbox.com',
      to: email,
      subject: 'Forgot Password',
      html
    });

    return res.status(200).json({ msg: 'Check your email' });
  } catch (error) {
    return res.status(400).json('Bad Request');
  }
};

exports.setNewPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!newPassword.length > 0 || !confirmPassword.length > 0) {
    return res.status(400).json({ msg: 'Please fill all the field' });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: 'Password not match with confirm Password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found address' });
    }

    user.password = newPassword;
    user.save();
    return res.json({ msg: 'Password set successfully' });
  } catch (error) {
    return res.status(400).json({ msg: 'Something went wrong' });
  }
};
