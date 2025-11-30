require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const requestId = require('./middleware/requestId');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/error');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3002;

// config mongodb

// Connection moved to async startup below

// config middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(requestId);
app.use(requestLogger);
app.use(express.static(path.join(__dirname, './build')));

// config strategy
require('./strategy/jwtStrategy')(passport);

// import routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const product = require('./routes/products');
const category = require('./routes/category');
const order = require('./routes/order');

// config routes
app.use('/api', auth);
app.use('/api', user);
app.use('/api', product);
app.use('/api', category);
app.use('/api', order);
app.use('/api', notFound);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// centralized error handler
app.use(errorHandler);

// async startup
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info('mongodb connected successfully');
    app.listen(port, () => logger.info(`app is running ${port}`));
  } catch (err) {
    logger.error({ err }, 'mongodb connection error');
    process.exit(1);
  }
})();

// process-level error visibility
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error(reason);
});
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
