require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../utils/logger');
const Category = require('../models/product/category');
const Product = require('../models/product/product');

async function connectToDatabase() {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error('MONGODB_URL is not set in environment');
  }
  await mongoose.connect(mongoUrl);
  logger.info('Connected to MongoDB');
}

async function clearCollections() {
  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({})
  ]);
  logger.info('Cleared products and categories collections');
}

function getMockCategories() {
  return [
    { category_name: 'Electronics' },
    { category_name: 'Clothing' },
    { category_name: 'Home & Kitchen' }
  ];
}

function getPlaceholderImage() {
  return {
    // Small placeholder buffer; replace with real image bytes if needed
    name: Buffer.from('placeholder image'),
    contentType: 'text/plain'
  };
}

function getMockProducts(categoryByName) {
  const image = getPlaceholderImage();
  const items = [
    {
      prod_name: 'Wireless Mouse',
      prod_price: 1299,
      prod_category: categoryByName['Electronics'],
      prod_type: 'physical',
      prod_stock: 50,
      prod_description: 'Ergonomic 2.4G wireless mouse with USB receiver',
      prod_image: image
    },
    {
      prod_name: 'Bluetooth Headphones',
      prod_price: 3999,
      prod_category: categoryByName['Electronics'],
      prod_type: 'physical',
      prod_stock: 30,
      prod_description: 'Over-ear noise-isolating headphones with 30h battery',
      prod_image: image
    },
    {
      prod_name: 'Cotton T-Shirt',
      prod_price: 799,
      prod_category: categoryByName['Clothing'],
      prod_type: 'physical',
      prod_stock: 100,
      prod_description: '100% cotton crew-neck t-shirt',
      prod_image: image
    },
    {
      prod_name: 'Denim Jeans',
      prod_price: 1999,
      prod_category: categoryByName['Clothing'],
      prod_type: 'physical',
      prod_stock: 40,
      prod_description: 'Slim fit mid-rise denim jeans',
      prod_image: image
    },
    {
      prod_name: 'Stainless Steel Water Bottle',
      prod_price: 999,
      prod_category: categoryByName['Home & Kitchen'],
      prod_type: 'physical',
      prod_stock: 70,
      prod_description: 'Insulated 1L bottle keeps drinks cold/hot for hours',
      prod_image: image
    },
    {
      prod_name: 'Ceramic Mug',
      prod_price: 399,
      prod_category: categoryByName['Home & Kitchen'],
      prod_type: 'physical',
      prod_stock: 120,
      prod_description: '350ml ceramic mug, microwave and dishwasher safe',
      prod_image: image
    }
  ];
  return items;
}

async function seed() {
  await connectToDatabase();
  try {
    await clearCollections();

    // Create categories
    const createdCategories = await Category.insertMany(getMockCategories());
    const categoryByName = createdCategories.reduce((acc, c) => {
      acc[c.category_name] = c._id;
      return acc;
    }, {});
    logger.info(`Inserted ${createdCategories.length} categories`);

    // Create products
    const products = getMockProducts(categoryByName);
    const createdProducts = await Product.insertMany(products);
    logger.info(`Inserted ${createdProducts.length} products`);
  } finally {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

seed().then(() => {
  logger.info('Seeding completed successfully');
  process.exit(0);
}).catch((err) => {
  logger.error({ err }, 'Seeding failed');
  // Ensure disconnect attempt even if connect failed partially
  mongoose.connection.readyState ? mongoose.disconnect().finally(() => process.exit(1)) : process.exit(1);
});


