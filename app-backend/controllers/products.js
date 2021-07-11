const Product = require('../models/product/product')
const { errorHandler } = require('./helperFunction/helper')
const formidable = require("formidable");
const fs = require("fs")

exports.getProduct = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return errorHandler(res, { error: err, data: !product, msg: "Product not found" })
        }
        req.product = product
        next()
    })
}

exports.getAllProducts = (req, res) => {
    Product.aggregate([
        {
          '$lookup': {
            'from': 'categories', 
            'localField': 'prod_category', 
            'foreignField': '_id', 
            'as': 'prod_category'
          }
        }, {
          '$unwind': {
            'path': '$prod_category'
          }
        }, {
          '$project': {
            'product_name': '$prod_name', 
            'product_price': '$prod_price', 
            'product_image': '$prod_image', 
            'product_stock': '$prod_stock', 
            'product_description': '$prod_description', 
            'product_category': '$prod_category', 
            'createdAt': 1, 
            'updatedAt': 1
          }
        }
      ])
    .exec((err, product) => {
            if (err) {
                return errorHandler(res, { error: err })
            }
            res.json(product)
        })
}

exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err, fields, file) => {
        if (err) {
            return errorHandler(res, { data: err, msg: "Something wrong with image" })
        }
        const product = new Product(fields)
        if (file.prod_image) {
            if (file.prod_image.size > 10000000) {
                return errorHandler(res, { data: true, msg: "Image Size is too big" })
            }
            product.prod_image.name = fs.readFileSync(file.prod_image.path)
            product.prod_image.contentType = file.prod_image.type
        }
        product.save((err, product) => {
            if (err) {
                return errorHandler(res, { error: err })
            }
            res.status(200).json({ msg: 'Product updated successfully' })
        })
    })
}

exports.getProductDetails = (req, res) => {
    res.status(200).json(req.product)
}

exports.updateProduct = (req, res) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err, fields, file) => {
        if (err) {
            return errorHandler(res, { data: err, msg: "Something wrong with image" })
        }
        const updatedData = { ...fields }
        if (file.prod_image) {
            if (file.prod_image.size > 10000000) {
                return errorHandler(res, { data: true, msg: "Image Size is too big" })
            }
            updatedData.prod_image = {}
            updatedData.prod_image.name = fs.readFileSync(file.prod_image.path)
            updatedData.prod_image.contentType = file.prod_image.type
        }
        Product.findOneAndUpdate(
            { _id: req.product._id },
            { $set: updatedData },
            { new: true },
        ).exec((err, product) => {
            if (err || !product) {
                return errorHandler(res, { error: err, data: !product, msg: "Product not available" })
            }
            return res.status(200).json({ msg: 'Product updated successfully' })
        })
    })

}

exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.product._id }).exec((err, product) => {
        if (err) {
            return errorHandler(res, { error: err })
        }
        return res.status(200).json({ product, msg: "Product deleted successfully" })
    })
}