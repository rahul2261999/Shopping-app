import React from 'react'
import ProductPage from '../ProductPageLayout/ProductPageLayout'
import {Product} from '../../assests/raw-data/raw-data'



const TShirt = props =>{
    return (
        <ProductPage title="Shoes" products={Product} />
    )
}

export default TShirt