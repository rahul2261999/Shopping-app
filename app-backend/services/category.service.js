const Category = require('../models/product/category');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

async function findCategoryById(id) {
  const cate = await Category.findById(id).exec();
  if (!cate) {
    throw new BadRequestError('Category not found');
  }
  logger.debug({ categoryId: id }, 'category loaded by id');
  return cate;
}

async function getAllCategories() {
  const categories = await Category.find().exec();
  logger.info({ count: categories.length }, 'all categories fetched');
  return categories;
}

async function createCategory(body) {
  logger.info({ name: body.category_name }, 'creating category');
  const newCategory = new Category(body);
  const cate = await newCategory.save();
  if (!cate) {
    throw new BadRequestError('Not able to create category');
  }
  logger.info({ categoryId: cate._id }, 'category created');
  return cate;
}

async function updateCategory(category, body) {
  category.category_name = body.category_name;
  const cate = await category.save();
  if (!cate) {
    throw new BadRequestError('Not able to updated category');
  }
  logger.info({ categoryId: cate._id }, 'category updated');
  return cate;
}

async function deleteCategory(category) {
  const cate = await category.deleteOne();
  if (!cate) {
    throw new BadRequestError('Not able to delete category');
  }
  logger.info({ categoryId: category._id }, 'category deleted');
  return { msg: 'Category deleted successfully' };
}

module.exports = {
  findCategoryById,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};


