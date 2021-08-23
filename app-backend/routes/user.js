const express = require('express');
const passport = require('passport');

const { isAdmin } = require('../controllers/auth');
const { getUserDetails } = require('../controllers/user');
const { getAllUser } = require('../controllers/user');

const route = express.Router();
route.param('id', getUserDetails);

route.post('/allusers', passport.authenticate('jwt', { session: false }), isAdmin, getAllUser);
route.get('/getuser/:id', (req, res) => {
  res.json(req.profile);
});

module.exports = route;
