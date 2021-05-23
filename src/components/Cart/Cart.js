import React,{useState} from 'react'
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

    const addedItems = props.addedProduct.map(item=>{
        return <CartCard
                    key={item.product_id}
                    title={item.product_name}
                    image={item.product_image}
                    price={item.product_price}
                    quantity={1}
                    totalPrice={item.product_price}
                    changeQty = {()=>{}}
                />
    })
    return (
        <Wrapper>
            <CartHeader>
                <div>
                    <Icon as={FaShoppingBag}/> Cart
                </div>
                <Icon as={IoClose} />
            </CartHeader>
            <ScrollBar>
                <CartBody>
                    {addedItems}
                </CartBody>
            </ScrollBar>
            <CartFooter>Checkout</CartFooter>
        </Wrapper>
    )
}

export default Cart