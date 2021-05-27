import React from 'react'
import {FaPlus,FaMinus, FaRupeeSign} from 'react-icons/fa'
import {
    Card,
    ButtonContainer,
    Control,
    Input,
    Image,
    ProductDetails,
    ProductTitle,
    Price,
    TotalPrice
} from './style'


const CartCard = props =>{
   const {
       image,
       title,
       price,
       quantity,
       totalPrice,
       changeQty
   } = props
    return(
        <Card>
            <Image>
                <img src={image} alt="Item" width="100%" height="100%"/>
            </Image>
            <ProductDetails>
                <ProductTitle>{title}</ProductTitle>
                <Price><FaRupeeSign/>{price}</Price>
                <ButtonContainer>
                <Control as={FaMinus} onClick={changeQty} />
                <Input>{quantity}</Input>
                <Control as={FaPlus} onClick={changeQty} />
            </ButtonContainer>
            </ProductDetails>
            <TotalPrice><FaRupeeSign/>{totalPrice}</TotalPrice> 
        </Card>
    )
}

export default CartCard