import React from 'react'
import { Product } from '../../assests/raw-data/raw-data'
import ProductPage from '../ProductPageLayout/ProductPageLayout'


const TShirt = props =>{
    return (
        <ProductPage title="T-Shirts" products={Product} />
    )
}

export default TShirt