import React from 'react'
import {FaShoppingBag} from 'react-icons/fa'
import {IoClose} from 'react-icons/io5'
import CartCard from '../../utilities/CartCard/CartCard'
import {
    Wrapper,
    CartHeader,
    Icon,
    ScrollBar,
    CartBody,
    CartFooter
} from './style'

const Cart = props => {
    const {show,closeCart,addedProduct,changeQty,removeProduct,checkout} = props
    const addedItems = addedProduct.map(item=>{
        return <CartCard
                    key={item._id}
                    title={item.product_name}
                    image={`data:${item.product_image.contentType};base64,${item.product_image.name}`}
                    price={item.product_price}
                    quantity={item.quantity}
                    totalPrice={item.product_price*item.quantity}
                    changeQty = {(type)=>changeQty(item,type)}
                    removeProduct={()=>removeProduct(item._id)}
                />
    })
    const totalAmount = addedProduct.map(item=>item.product_price*item.quantity).reduce((sum,val)=>sum+val,0)
    
    return (
        <Wrapper show={show?'show':false} >
            <CartHeader>
                <div>
                    <Icon as={FaShoppingBag}/> Cart
                </div>
                <Icon as={IoClose} onClick={closeCart} />
            </CartHeader>
            <ScrollBar>
                <CartBody>
                    {addedItems}
                </CartBody>
            </ScrollBar>
            <CartFooter 
            disabled={!addedProduct.length}
            onClick={checkout}
            >Checkout (Total Amount Rs. : {totalAmount})</CartFooter>
        </Wrapper>
    )
}

export default Cart