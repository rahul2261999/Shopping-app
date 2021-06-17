import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderBar,Icon} from './style'
import {FaPlusSquare} from 'react-icons/fa'
import AddEditProdduct from './AddEditProduct/AddEditProduct'
import memoizedProducts from '../../../redux/selector/products'
import { closeModal, deleteProduct, fetchAllProduct, openModal } from '../../../redux/actions/product'
import ProductPage from '../../ProductPageLayout/ProductPageLayout'
import { getUser } from '../../../utilities/helperFunction'

const Product = props =>{

    const {modal,allProducts} = useSelector(memoizedProducts)
    const {token,user} = getUser()
    
    const [editForm,setEditForm] = useState(false)
    const [filterProduct,setFilterProduct] = useState('')

    useEffect(()=>{
        dispatch(fetchAllProduct())
    },[])

    const dispatch = useDispatch()
    const modalOpenHandler = ()=>{
        setEditForm(false)
        dispatch(openModal())
    }
    const modalCloseHandler = ()=>{
        setEditForm(false)
        dispatch(closeModal())
    }

    const editProductHandler = id =>{
        console.log(id)
        setEditForm(true)
        const product = allProducts.find(prod=>prod._id===id)
        setFilterProduct(product);
        dispatch(openModal())
    }

    const deleteProductHandler = prodId =>{
        dispatch(deleteProduct({token,userId:user._id,prodId}))
    }

    return(
        <React.Fragment>
        <HeaderBar>
             <Icon on as={FaPlusSquare} onClick={modalOpenHandler} /> Add New Product
        </HeaderBar>
        <ProductPage 
            products={allProducts} 
            isAdmin 
            editProduct={editProductHandler}
            deletoProduct = {deleteProductHandler}
        />
        {modal&&<AddEditProdduct
                    edit={editForm}
                    filterProduct={filterProduct}
                    openModal={modal}
                    closeModal={modalCloseHandler}
                    />}
        </React.Fragment>
        

    )
}

export default Product