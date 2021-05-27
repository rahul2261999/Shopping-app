import React from 'react'
import{
    Card,
    CardContainer,
    DetailBody,
    ProductTitle,
    DetailWrapper,
    CartIcon,
    Price

} from './style'
import {FaShoppingBag,FaRupeeSign} from 'react-icons/fa'
const ProductCard = props =>{
    const { title,image,category,price,openPreviewModal } = props
    return(
        <Card>
            <CardContainer>
                <img src={image} alt="prod1" height="350px" width="300px" />
                <DetailBody>
                    <ProductTitle>{title}</ProductTitle>
                    <DetailWrapper>
                        <span>{category}</span>
                        <CartIcon as={FaShoppingBag} onClick={openPreviewModal} />
                    </DetailWrapper>
                    <Price>
                       <FaRupeeSign/> {price}
                    </Price>
                </DetailBody>
            </CardContainer>
        </Card>
    )
}

export default ProductCard