const formidable = require('formidable');

const productService = require('../services/product.service');
const logger = require('../utils/logger');

exports.getProduct = async (req, res, next, id) => {
  try {
    logger.info({ requestId: req.requestId, id }, 'controller:products.getProduct param start');
    const product = await productService.getProductById(id);
    req.product = product;
    logger.info({ requestId: req.requestId, id }, 'controller:products.getProduct param success');
    return next();
  } catch (err) {
    logger.error({ requestId: req.requestId, err, id }, 'controller:products.getProduct param error');
    return next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId }, 'controller:products.getAllProducts start');
    const products = await productService.getAllProducts();
    logger.info(
      {
        requestId: req.requestId,
        count: Array.isArray(products) ? products.length : 0
      },
      'controller:products.getAllProducts success'
    );
    return res.json(products);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:products.getAllProducts error');
    return next(err);
  }
};

exports.createProduct = (req, res, next) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, file) => {
    try {
      if (err) {
        throw err;
      }
      logger.info({ requestId: req.requestId, name: fields?.prod_name }, 'controller:products.createProduct start');
      const result = await productService.createProduct(fields, file);
      logger.info({ requestId: req.requestId }, 'controller:products.createProduct success');
      return res.status(200).json(result);
    } catch (e) {
      logger.error({ requestId: req.requestId, err: e }, 'controller:products.createProduct error');
      return next(e);
    }
  });
};

exports.getProductDetails = (req, res) => {
  logger.info({ requestId: req.requestId, productId: req.product?._id }, 'controller:products.getProductDetails success');
  res.status(200).json(req.product);
};

exports.updateProduct = (req, res, next) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, file) => {
    try {
      if (err) {
        throw err;
      }
      logger.info({ requestId: req.requestId, productId: req.product?._id }, 'controller:products.updateProduct start');
      const result = await productService.updateProduct(req.product._id, fields, file);
      logger.info({ requestId: req.requestId, productId: req.product?._id }, 'controller:products.updateProduct success');
      return res.status(200).json(result);
    } catch (e) {
      logger.error({ requestId: req.requestId, err: e, productId: req.product?._id }, 'controller:products.updateProduct error');
      return next(e);
    }
  });
};

exports.deleteProduct = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, productId: req.product?._id }, 'controller:products.deleteProduct start');
    const result = await productService.deleteProduct(req.product._id);
    logger.info({ requestId: req.requestId, productId: req.product?._id }, 'controller:products.deleteProduct success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, productId: req.product?._id }, 'controller:products.deleteProduct error');
    return next(err);
  }
};
