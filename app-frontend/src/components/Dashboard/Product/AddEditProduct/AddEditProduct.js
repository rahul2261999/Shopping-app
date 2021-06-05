import React,{useEffect, useState} from 'react'
import ModalTemplate from '../../../../utilities/ModalTemplate/ModalTemplate'
import {requireField,isObjectEmpty, getUser} from '../../../../utilities/helperFunction'

import {Button, FormContainer,FormWrapper} from './style'
import {useDispatch} from 'react-redux'
import { createProduct, updateProduct } from '../../../../redux/actions/product'

const AddEditProduct = props =>{
    const {
        openModal,
        closeModal,
        edit,
        filterProduct
    } = props

    const initialState = {
        product:{
            prod_name:'',
            prod_price:0,
            prod_stock:0,
            prod_image:'',
            prod_category:'',
            prod_desc:'',
        },

       error:{
        name:false,
        category:false,
       }
    }
    const {product,error} = initialState
    const {token,user} = getUser()
    const dispatch = useDispatch()
    
    const [productDetails,setProductDetails] = useState(product)
    const {prod_name,prod_price,prod_stock,prod_image,prod_category,prod_desc} = productDetails

    const [productError,setProductError] = useState(error)
    const {name,category} = productError

    const Category = [
        { key: 'unisex', value: 'Unisex', text: 'Unisex Collection' },
        { key: 'gents', value: 'Male', text: 'Gents Collection' },
        { key: 'female', value: 'Female', text: 'Female Collection' },
    ]

    const {_id:product_id,product_name,product_price,product_category,product_description,product_stock} = filterProduct
    
    useEffect(()=>{
        if(edit){
            setProductDetails({
                ...productDetails,
                prod_name:product_name,
                prod_price:product_price,
                prod_stock:product_stock,
                prod_image:'',
                prod_category:product_category,
                prod_desc:product_description
            })
        }
    },[product_id])

    const valueHandler = (e,{name,value}) =>{
        if(name==="prod_price"|| name==="prod_stock"){
            const regex = /^[0-9]*$/
            if(regex.test(value)){
            setProductDetails({...productDetails,[name]:value})
            }
        }else{
        setProductDetails({...productDetails,[name]:value})
        }
    }

    const validation =()=>{
        setProductError(error)
        const Proderror ={
            name:requireField(prod_name,"Product name require"),
            category:requireField(prod_category,"Please Select the Category"),
        }
        return Proderror
    }

    const formSubmitHandler = () =>{
        const validateForm = validation()
        if(isObjectEmpty(validateForm)){
            edit? dispatch(updateProduct(token,user._id,product_id,productDetails)):dispatch(createProduct(token,user._id,productDetails))
        }else{
            setProductError(validateForm)
        }
    }

    return(
        <ModalTemplate
            modalTitle="edit-product"
            isMount={openModal}
            isModalOpen={closeModal}
            maxWidth="400px"
            headerTitle={edit?"Edit Product":"Add New Product"}
               
        >
            <FormContainer>
                <FormWrapper 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        formSubmitHandler()
                        }
                    }
                    
                 >
                    <FormWrapper.Input 
                        label="Product Name"
                        type="text"
                        name="prod_name"
                        value={prod_name}
                        onChange={valueHandler} 
                        error={name}/>

                    <FormWrapper.Input 
                        label="Price"
                        type="number"
                        name="prod_price"
                        value={prod_price}
                        onChange={valueHandler} 
                       />
                    
                    <FormWrapper.Input 
                        label="Stock Available"
                        type="text"
                        name="prod_stock"
                        value={prod_stock}
                        onChange={valueHandler} 
                    />
                    
                    <FormWrapper.Input 
                        label="Product Image"
                        type="file"
                        name="prod_image"
                        value={prod_image}
                        onChange={valueHandler} 
                        error={false}/>

                    <FormWrapper.Select 
                        label="Category"
                        options={Category}
                        name="prod_category"
                        value={prod_category}
                        onChange={valueHandler} 
                        error={category}/>
                    
                    <FormWrapper.TextArea 
                        label="Description"
                        name="prod_desc"
                        value={prod_desc}
                        onChange={valueHandler}/>

                    <Button>{edit?'Update Product':'Add Product'} </Button>
                </FormWrapper>
            </FormContainer>
        </ModalTemplate>
    )
}

export default AddEditProduct