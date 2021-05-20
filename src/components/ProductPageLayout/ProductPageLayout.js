import React from 'react'
import Wrapper from '../../hoc/Wrapper'

import {HeaderTag,ProductContainer} from './style'

const ProductPage = props =>{
    const {title,products} = props
    return(
        <Wrapper>
            <HeaderTag>{title}</HeaderTag>
            <ProductContainer></ProductContainer>
        </Wrapper>
    )
}

export default ProductPage