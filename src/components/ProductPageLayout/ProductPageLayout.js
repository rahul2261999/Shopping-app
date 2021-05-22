import React, { useState } from 'react'
import Wrapper from '../../hoc/Wrapper'

import ProductCard from '../../utilities/ProductCard/ProductCard'
import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate'


import {HeaderTag,ProductContainer} from './style'

const ProductPage = props =>{

    const [isPreview,setIsPreview] = useState(false)

    const {title,products} = props


    const ShowProduct = products.map(item=>{
        return (
            <ProductCard 
                key={item.product_id}
                title={item.product_name}
                image={item.product_image}
                price={item.product_price}
                category={item.product_cate}
                openPreviewModal={()=>setIsPreview(true)}
            />
        )
    })
    return(
        <Wrapper>
            <HeaderTag>{title}</HeaderTag>
            <ProductContainer>{ShowProduct}</ProductContainer>
            {isPreview?
                <ModalTemplate
                    modalTitle="Product Preview"
                    headerTitle="Product Details"
                    isMount={isPreview}
                    isModalOpen={setIsPreview}
                >
                    <h1>Product</h1>
                </ModalTemplate>
            :null}
        </Wrapper>
    )
}

export default ProductPage