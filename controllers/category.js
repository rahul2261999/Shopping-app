const Category = require('../models/product/category')
const {errorHandler} = require('./helperFunction/helper')

exports.findCategory = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return errorHandler(res,{error:err})
        }
        req.category=cate
        next()
    })
}

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return errorHandler(res,{error:err})
        }
        res.status(200).json(categories)
    })
}

exports.singleCategory = (req,res)=>{
    res.status(200).json(req.category)
}

exports.createCategory = (req,res)=>{
    const newCategory = new Category(req.body)
    newCategory.save((err,cate)=>{
        if(err||!cate){
            return errorHandler(res,{error:err,data:!cate,msg:"Not able to create category"})
        }
        res.status(200).json(cate)
    })
}

exports.updateCategory = (req,res)=>{
    const category = req.category
    category.category_name = req.body.category_name
    category.save((err,cate)=>{
        if(err||!cate){
            return errorHandler(res,{error:err,data:!cate,msg:"Not able to updated category"})
        }
        res.status(200).json(cate)
    })
}

exports.deleteCategory = (req,res)=>{
    const category = req.category
    category.remove((err,cate)=>{
        if(err||!cate){
            return errorHandler(res,{error:err,data:!cate,msg:"Not able to delete category"})
        }
        res.status(200).json({msg:"Category deleted successfully"})
    })
}