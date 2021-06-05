const Product = require('../models/product/product')
const { errorHandler } = require('./helperFunction/helper')
const formidable = require("formidable");
const fs = require("fs")
const url = require('url')

exports.getProduct = (req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
       if(err||!product){
           return errorHandler(res,{error:err,data:!product,msg:"Product not found"})
       }
        req.product = product
        next()
    })
}

exports.getAllProducts = (req,res)=>{
    Product.find({},{
  product_name:'$prod_name',
  product_price:'$prod_price',
  product_image:'$prod_image',
  product_stock:'$prod_stock',
  createdAt:1,
  updatedAt:1,
  
}).exec((err,product)=>{
        if(err){
            return errorHandler(res,{error:err})
        }
        res.json(product)
    })
}

exports.createProduct = (req,res)=>{
    
    const form = new formidable.IncomingForm({keepExtensions:true})
    form.parse(req,(err,fields,file)=>{
        if(err){
            return errorHandler(res,{data:err,msg:"Something wrong with image"})
        }
        const product = new Product(fields)
        if(file.prod_image){
            if(file.prod_image.size>10000000){
                return errorHandler(res,{data:true,msg:"Image Size is too big"})
            }
            product.prod_image.name = fs.readFileSync(file.prod_image.path)
            product.prod_image.contentType = file.prod_image.type
        }
        product.save((err,prod)=>{
            if(err){
                return errorHandler(res,{error:err})
            }
            res.status(200).json(prod)
        })
    })
}

exports.getProductDetails = (req,res) =>{
    const {prod_image} = req.product
    res.status(200).json(req.product)
}

exports.updateProduct = (req,res)=>{
    Product.findOneAndUpdate(
        {_id:req.product._id},
        {$set:req.body},
        {new:true}
    ).exec((err,product)=>{
        if(err||!product){
            return errorHandler(res,{error:err,data:!product,msg:"Product not available"})
        }
        return res.status(200).json(product)
    })
}

exports.deleteProduct = (req,res)=>{
    Product.deleteOne({_id:req.product._id}).exec((err)=>{
        if(err){
            return errorHandler(res,{error:err})
        }
        return res.status(200).json({msg:"Product deleted successfully"})
    })
}