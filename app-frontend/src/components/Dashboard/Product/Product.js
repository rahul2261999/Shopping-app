import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderBar,Icon} from './style'
import {FaPlusSquare} from 'react-icons/fa'
import AddEditProdduct from './AddEditProduct/AddEditProduct'
import memoizedProducts from '../../../redux/selector/products'
import { closeModal, openModal } from '../../../redux/actions/product'
import ProductPage from '../../ProductPageLayout/ProductPageLayout'

const Product = props =>{

    const {modal,allProducts} = useSelector(memoizedProducts)
    
    const [editForm,setEditForm] = useState(false)
    const [filterProduct,setFilterProduct] = useState('')

    const dispatch = useDispatch()
    const modalOpenHandler = ()=>{
        dispatch(openModal())
    }
    const modalCloseHandler = ()=>{
        setEditForm(false)
        dispatch(closeModal())
    }

    const editProductHandler = id =>{
        setEditForm(true)
        const product = allProducts.find(prod=>prod.product_id===id)
        setFilterProduct(product);
        dispatch(openModal())
    }

    return(
        <React.Fragment>
        <HeaderBar>
             <Icon on as={FaPlusSquare} onClick={modalOpenHandler} /> Add New Product
        </HeaderBar>
        <ProductPage products={allProducts} isAdmin editProduct={editProductHandler} />
        {modal&&<AddEditProdduct edit={editForm} filterProduct={filterProduct} openModal={modal} closeModal={modalCloseHandler} />}
        </React.Fragment>
        

    )
}

export default Product