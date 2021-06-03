import React,{useEffect, useState} from 'react'
import ModalTemplate from '../../../../utilities/ModalTemplate/ModalTemplate'

import {Button, FormContainer,FormWrapper} from './style'

const AddEditProduct = props =>{
    const {
        openModal,
        closeModal,
        edit,
        filterProduct
    } = props
    const [productDetails,setProductDetails] = useState({
        prod_name:'',
        prod_price:'',
        prod_stock:'',
        prod_image:'',
        prod_category:'',
        prod_desc:'',
    })

    const {prod_name,prod_price,prod_stock,prod_image,prod_category,prod_desc} = productDetails

    const Category = [
        { key: 'af', value: 'winter', text: 'Winter Collection' },
        { key: 'ax', value: 'Summer', text: 'Summer Collection' },
    ]

    const {product_id,product_name,product_price,product_cate,product_desc,stock} = filterProduct
    useEffect(()=>{
        if(edit){
            setProductDetails({
                ...productDetails,
                prod_name:product_name,
                prod_price:product_price,
                prod_stock:stock,
                prod_image:'',
                prod_category:product_cate,
                prod_desc:product_desc
            })
        }
    },[product_id])

    const valueHandler = (e,{name,value}) =>{
        setProductDetails({...productDetails,[name]:value})
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
                <FormWrapper>
                    <FormWrapper.Input 
                        label="Product Name"
                        type="text"
                        name="prod_name"
                        value={prod_name}
                        onChange={valueHandler} 
                        error={false}/>

                    <FormWrapper.Input 
                        label="Price"
                        type="number"
                        name="prod_price"
                        value={prod_price}
                        onChange={valueHandler} 
                        error={false}/>
                    
                    <FormWrapper.Input 
                        label="Stock Available"
                        type="number"
                        name="prod_stock"
                        value={prod_stock}
                        onChange={valueHandler} 
                        error={false}/>
                    
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
                        error={false}/>
                    
                    <FormWrapper.TextArea 
                        label="Description"
                        name="prod_desc"
                        value={prod_desc}
                        onChange={valueHandler} 
                        error={false}/>

                    <Button>{edit?'Update Product':'Add Product'} </Button>
                </FormWrapper>
            </FormContainer>
        </ModalTemplate>
    )
}

export default AddEditProduct