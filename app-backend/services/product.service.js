const fs = require('fs');
const Product = require('../models/product/product');
const { BadRequestError } = require('../errors/HttpErrors');
const logger = require('../utils/logger');

async function getProductById(id) {
  const product = await Product.findById(id).exec();
  if (!product) {
    throw new BadRequestError('Product not found');
  }
  logger.debug({ productId: id }, 'product loaded by id');
  return product;
}

async function getAllProducts() {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'prod_category',
        foreignField: '_id',
        as: 'prod_category'
      }
    }, {
      $unwind: {
        path: '$prod_category'
      }
    }, {
      $project: {
        product_name: '$prod_name',
        product_price: '$prod_price',
        product_image: '$prod_image',
        product_stock: '$prod_stock',
        product_description: '$prod_description',
        product_category: '$prod_category',
        product_type: '$prod_type',
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]).exec();
  logger.info({ count: products.length }, 'all products fetched');
  return products;
}

async function createProduct(fields, file) {
  logger.info({ prod_name: fields.prod_name }, 'creating product');
  const product = new Product(fields);
  if (file && file.prod_image) {
    if (file.prod_image.size > 10000000) {
      throw new BadRequestError('Image Size is too big');
    }
    product.prod_image.name = fs.readFileSync(file.prod_image.path);
    product.prod_image.contentType = file.prod_image.type;
  }
  await product.save();
  logger.info({ productId: product._id }, 'product created');
  return { msg: 'Product updated successfully' };
}

async function updateProduct(productId, fields, file) {
  logger.info({ productId }, 'updating product');
  const updatedData = { ...fields };
  if (file && file.prod_image) {
    if (file.prod_image.size > 10000000) {
      throw new BadRequestError('Image Size is too big');
    }
    updatedData.prod_image = {};
    updatedData.prod_image.name = fs.readFileSync(file.prod_image.path);
    updatedData.prod_image.contentType = file.prod_image.type;
  }
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    { $set: updatedData },
    { new: true }
  ).exec();
  if (!product) {
    throw new BadRequestError('Product not available');
  }
  logger.info({ productId }, 'product updated');
  return { msg: 'Product updated successfully' };
}

async function deleteProduct(productId) {
  const res = await Product.deleteOne({ _id: productId }).exec();
  logger.info({ productId }, 'product deleted');
  return { product: res, msg: 'Product deleted successfully' };
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};


