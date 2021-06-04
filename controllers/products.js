const Product = require('../models/product/product')
const { errorHandler } = require('./helperFunction/helper')

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
    Product.find().exec((err,product)=>{
        if(err){
            return errorHandler(res,{error:err})
        }
        res.json(product)
    })
}

exports.createProduct = (req,res)=>{
    const newProduct = new Product(req.body)
    newProduct.save((err,saveProd)=>{
        if(err){
            return errorHandler(res,{data:err,msg:"Product not able to save"})
        }
        return res.status(200).json(saveProd)
    })
}

exports.getProductDetails = (req,res) =>{
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