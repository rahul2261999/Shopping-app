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
import {FaShoppingBag,FaRupeeSign,FaTrash,FaPen} from 'react-icons/fa'
const ProductCard = props =>{
    const { title,image,category,price,openPreviewModal,isAdmin,onEdit } = props
    return(
        <Card>
            <CardContainer>
                <img src={image} alt="prod1" height="350px" width="300px" />
                <DetailBody>
                    <ProductTitle>{title}</ProductTitle>
                    <DetailWrapper>
                        <span>{category}</span>
                        {isAdmin?
                        <div>
                            <CartIcon as={FaPen} onClick={onEdit} />
                            <CartIcon as={FaTrash} onClick={()=>{}} />
                        </div>
                        :
                        <CartIcon as={FaShoppingBag} onClick={openPreviewModal} />}
                        
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