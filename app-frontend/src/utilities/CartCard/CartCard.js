import React from 'react'
import { FaPlus, FaMinus, FaRupeeSign, FaTrash } from 'react-icons/fa'
import {
    Card,
    ButtonContainer,
    Control,
    Input,
    Image,
    ProductDetails,
    ProductTitle,
    Price,
    TotalPrice,
    DeleteIcon
} from './style'


const CartCard = props => {
    const {
        image,
        title,
        price,
        quantity,
        totalPrice,
        changeQty,
        removeProduct,
        hideButton
    } = props
    return (
        <Card>
            <Image>
                <img src={image} alt="Item" width="100%" height="100%" />
            </Image>
            <ProductDetails>
                <ProductTitle>{title}</ProductTitle>
                <Price><FaRupeeSign />{price}</Price>
                {!hideButton&&<ButtonContainer>
                    <Control as={FaMinus} onClick={() => { changeQty("DEC") }} />
                    <Input>{quantity}</Input>
                    <Control as={FaPlus} onClick={() => changeQty("INC")} />
                </ButtonContainer>}
            </ProductDetails>
            <TotalPrice><FaRupeeSign />{totalPrice}</TotalPrice>
            <DeleteIcon as={FaTrash} onClick={removeProduct} />
        </Card>
    )
}

export default CartCard