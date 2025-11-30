const User = require('../models/user/user');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

async function getUserDetailsById(id) {
  const user = await User.find({ _id: { $in: [id] } }, { encry_password: 0, salt: 0 }).exec();
  if (!user) {
    throw new BadRequestError('network problem');
  }
  logger.debug({ userId: id }, 'user details loaded by id');
  return user;
}

async function getAllUsers() {
  const users = await User.find({}, { encry_password: 0, salt: 0 }).exec();
  if (!users) {
    throw new BadRequestError('Users not found');
  }
  logger.info({ count: users.length }, 'all users fetched');
  return users;
}

module.exports = {
  getUserDetailsById,
  getAllUsers
};


