const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const User = require("../models/user/user")
const VerifyToken = require('../models/verifyToken/verifyToken')
const {
    validationResult
} = require("express-validator")
const {
    errorHandler
} = require('./helperFunction/helper')


exports.signUp = (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        console.log("here");
        return res.status(400).json({
            error: error.array()[0].msg
        })
    }

    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err || user) {
            return errorHandler(res, {
                error: err,
                data: user,
                msg: "User already registerd with this email"
            })
        }
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if (err) {
                return errorHandler(res, {
                    error: err
                })
            }
            const { _id, first_name, last_name, email } = user
            const token = jwt.sign({ first_name, last_name, email }, process.env.TOKEN_SECRET)
            const saveToken = new VerifyToken({ user: _id, token })
            saveToken.save((err, tokenData) => {
                if (err) {
                    return errorHandler(res, {
                        error: err
                    })
                }
                let transporter = nodemailer.createTransport({
                    host: 'smtp-relay.sendinblue.com',
                    port: 587,
                    auth: {
                        type: 'Login',
                        user: process.env.SMPT_USERNAME,
                        pass: process.env.SMPT_PASSWORD
                    },
                })
                ejs.renderFile(path.resolve('./public') + path.normalize('/html/email.ejs'), {
                    user: first_name.concat(last_name),
                    email: email,
                    pathname: `http://localhost:3001/user/verify/${tokenData.token}`
                }, (err, html) => {
                    if (err) {
                        return res.status(400).json({ msg: err })
                    }
                    transporter.sendMail({
                        from: 'rahulsaini2261999@pepisandbox.com',
                        to: email,
                        html: html
                    }, (err) => {
                        if (err) {
                            return errorHandler(res, {
                                error: err
                            })
                        }
                        res.status(200).json({ msg: "Verify email link send to your email" })
                    })
                })
            })
        })
    })
}

exports.signIn = (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()[0].msg
        })
    }
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err || !user) {
            return errorHandler(res, {
                error: err,
                data: !user,
                msg: "User not found with this email"
            })
        }
        if (!user.authenticated(req.body.password)) {
            return errorHandler(res, {
                data: true,
                msg: "Please enter correct password"
            })
        }

        const {
            _id,
            first_name,
            last_name,
            email,
            isAdmin
        } = user

        const token = jwt.sign({
            _id,
            first_name,
            last_name,
            email,
            isAdmin
        }, process.env.TOKEN_SECRET)
        res.json({
            token,
            user: {
                _id,
                first_name,
                last_name,
                email,
                isAdmin
            }
        })

    })
}

exports.validateUser = (req, res) => {
    const { token, payload: { email } } = req.user
    User.findOne({ email: email }).exec((err, user) => {
        if (err || !user) {
            return errorHandler(res, { error: err, data: !user, msg: 'User not found' })
        }
        if (user.isEmailVerified) {
            return res.status(200).json({ msg: "User already verified" })
        }
        user.isEmailVerified = true
        user.save((err) => {
            if (err) {
                return errorHandler(res, { error: err })
            }
            const { _id,
                first_name,
                last_name,
                email,
                isAdmin
            } = user
            res.status(200).json({
                token,
                user: {
                    _id,
                    first_name,
                    last_name,
                    email,
                    isAdmin
                }
            })
        })
    })
}



// middlewares

exports.isAdmin = (req, res, next) => {
    const check = req.user.isAdmin === 1
    if (!check) {
        return errorHandler(res, {
            data: !check,
            msg: "Require admin access"
        })
    }
    next()
}

exports.isEmailVerified = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err || !user) {
            return errorHandler(res, {
                error: err,
                data: !user,
                msg: "user not found"
            })
        }
        if (user.isEmailVerified) {
            return next()
        }
        const { _id, first_name, last_name, email } = user
        const token = jwt.sign({ first_name, last_name, email }, process.env.TOKEN_SECRET)
        const saveToken = new VerifyToken({ user: _id, token })
        saveToken.save((err, tokenData) => {
            if (err) {
                return errorHandler(res, {
                    error: err
                })
            }
            let transporter = nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: 587,
                auth: {
                    type: 'Login',
                    user: process.env.SMPT_USERNAME,
                    pass: process.env.SMPT_PASSWORD
                },
            })
            ejs.renderFile(path.resolve('./public') + path.normalize('/html/email.ejs'), {
                user: first_name.concat(last_name),
                email: email,
                pathname: `http://localhost:3001/user/verify/${tokenData.token}`
            }, (err, html) => {
                if (err) {
                    throw err
                }
                transporter.sendMail({
                    from: 'rahulsaini2261999@pepisandbox.com',
                    to: email,
                    subject: "verify your email",
                    html: html
                }, (err) => {
                    if (err) {
                        return errorHandler(res, {
                            error: err
                        })
                    }
                    res.status(200).json({ msg: "Verify email link send to your email" })
                })
            })
        })
    })
}

exports.decodeToken = (req, res, next) => {
    if (req.params.tokenId) {
        jwt.verify(req.params.tokenId, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return errorHandler(res, { data: true, msg: "Invalid request" })
            }
            req.user = { payload, token: req.params.tokenId }
            next()
        })
    }
}