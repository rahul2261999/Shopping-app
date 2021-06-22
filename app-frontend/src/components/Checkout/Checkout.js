import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { memoizedcartorder } from '../../redux/selector/cartorder'
import CartCard from '../../utilities/CartCard/CartCard'
import {
    CheckoutContainer,
    Container,
    MainHeading,
    FlexWrapper,
    FormContainer,
    CartDetail,
    Sublabel,
    Label,
    Input,
    Select,
    OrderButton,
    ButtonContainer,
    Text
} from './style'
// import { Input } from 'semantic-ui-react'
const Checkout = () => {
    const country = [{ key: "india", value: 'india', text: "India" }]
    const delivery = [{ key: "cod", value: 'cod', text: "Cash on Delivery" }]

    const { cartItems } = useSelector(memoizedcartorder)
    const cartProdList = cartItems.map(item => {
        return <CartCard
            key={item._id}
            title={item.product_name}
            image={`data:${item.product_image.contentType};base64,${item.product_image.name}`}
            price={item.product_price}
            quantity={item.quantity}
            totalPrice={item.product_price * item.quantity}
            hideButton
        />
    })
    console.log(cartProdList.length);


    return (
        <CheckoutContainer>
            <Container>
                <MainHeading>Checkout Cart</MainHeading>
                <FlexWrapper>
                    <FormContainer>
                        <Sublabel content="1">Personal Details</Sublabel>
                        <FormContainer.Group>
                            <FormContainer.Field width={6}>
                                <Label>First Name</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>

                            <FormContainer.Field width={6}>
                                <Label>last Name</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>
                        </FormContainer.Group>
                        <FormContainer.Group>
                            <FormContainer.Field width={6}>
                                <Label>Mobile Number</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>
                        </FormContainer.Group>

                        <Sublabel content="2">Shipping Details</Sublabel>
                        <FormContainer.Group>
                            <FormContainer.Field width={12}>
                                <Label>Address</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>
                            <FormContainer.Field width={4}>
                                <Label>City</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>
                        </FormContainer.Group>

                        <FormContainer.Group>
                            <FormContainer.Field width={6}>
                                <Label>State</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>
                            <FormContainer.Field width={6}>
                                <Label>Country</Label>
                                <Select
                                    options={country}
                                />
                            </FormContainer.Field>
                            <FormContainer.Field width={4}>
                                <Label>Zip Code</Label>
                                <Input
                                    transparent
                                    type="text"
                                />
                            </FormContainer.Field>

                        </FormContainer.Group>

                        <Sublabel content="3">Delivery Type</Sublabel>
                        <FormContainer.Field width={6}>
                            <Label>Payment Mode</Label>
                            <Select
                                options={delivery}
                            />
                        </FormContainer.Field>

                        <ButtonContainer>
                            <OrderButton>Order</OrderButton>
                            <OrderButton secondary>Cancel Order</OrderButton>
                        </ButtonContainer>


                    </FormContainer>
                    
                    <CartDetail>
                        {cartProdList.length>0?cartProdList:<Text>"No item added to cart!!!"</Text>}
                    </CartDetail>
                </FlexWrapper>
            </Container>
        </CheckoutContainer>
    )
}

export default Checkout