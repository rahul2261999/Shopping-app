const categoryService = require('../services/category.service');
const logger = require('../utils/logger');

exports.findCategory = async (req, res, next, id) => {
  try {
    logger.info({ requestId: req.requestId, id }, 'controller:category.findCategory param start');
    const cate = await categoryService.findCategoryById(id);
    req.category = cate;
    logger.info({ requestId: req.requestId, id }, 'controller:category.findCategory param success');
    return next();
  } catch (err) {
    logger.error({ requestId: req.requestId, err, id }, 'controller:category.findCategory param error');
    return next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId }, 'controller:category.getAllCategories start');
    const categories = await categoryService.getAllCategories();
    logger.info(
      {
        requestId: req.requestId,
        count: Array.isArray(categories) ? categories.length : 0
      },
      'controller:category.getAllCategories success'
    );
    return res.status(200).json(categories);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:category.getAllCategories error');
    return next(err);
  }
};

exports.singleCategory = (req, res) => {
  logger.info({ requestId: req.requestId, categoryId: req.category?._id }, 'controller:category.singleCategory success');
  res.status(200).json(req.category);
};

exports.createCategory = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, name: req.body?.category_name }, 'controller:category.createCategory start');
    const cate = await categoryService.createCategory(req.body);
    logger.info({ requestId: req.requestId, categoryId: cate?._id }, 'controller:category.createCategory success');
    return res.status(200).json(cate);
  } catch (err) {
    logger.error({ requestId: req.requestId, err }, 'controller:category.createCategory error');
    return next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, categoryId: req.category?._id }, 'controller:category.updateCategory start');
    const cate = await categoryService.updateCategory(req.category, req.body);
    logger.info({ requestId: req.requestId, categoryId: cate?._id }, 'controller:category.updateCategory success');
    return res.status(200).json(cate);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, categoryId: req.category?._id }, 'controller:category.updateCategory error');
    return next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    logger.info({ requestId: req.requestId, categoryId: req.category?._id }, 'controller:category.deleteCategory start');
    const result = await categoryService.deleteCategory(req.category);
    logger.info({ requestId: req.requestId, categoryId: req.category?._id }, 'controller:category.deleteCategory success');
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ requestId: req.requestId, err, categoryId: req.category?._id }, 'controller:category.deleteCategory error');
    return next(err);
  }
};
