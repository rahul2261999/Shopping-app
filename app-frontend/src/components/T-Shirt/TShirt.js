import React from 'react'
import { useSelector } from 'react-redux'
import memoizedProducts from '../../redux/selector/products'
import ProductPage from '../ProductPageLayout/ProductPageLayout'


const TShirt = props =>{
    const {allProducts} = useSelector(memoizedProducts)
    return (
        <ProductPage title="T-Shirts" products={allProducts} />
    )
}

export default TShirt