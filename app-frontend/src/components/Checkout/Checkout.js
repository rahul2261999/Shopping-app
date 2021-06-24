import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initCreateOrder } from '../../redux/actions/cartorder'
import { memoizedcartorder } from '../../redux/selector/cartorder'
import CartCard from '../../utilities/CartCard/CartCard'
import { getUser, isObjectEmpty, mobileNumberValidator, requireField, zipCodeValidator } from '../../utilities/helperFunction'
import Loader from '../../utilities/Loader/Loader'
import { Redirect } from 'react-router-dom'
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
    Text,
    ScrollBar,
    ChargesContainer,
    ChargesValue,
    ChargesLabel
} from './style'
// import { Input } from 'semantic-ui-react'
const Checkout = () => {
    const countries = [{ key: "india", value: 'india', text: "India" }]
    const delivery = [{ key: "cod", value: 'cod', text: "Cash on Delivery" }]

    const initialState = {
        userInputState: {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            address: "",
            city: '',
            state: '',
            country: '',
            zipcode: '',
            deliveryType: '',
        },
        inputErrorState: {
            firstNameError: false,
            lastNameError: false,
            mobileNumberError: false,
            addressError: false,
            cityError: false,
            stateError: false,
            countryError: false,
            zipcodeError: false,
            deliveryTypeError: false
        }
    }

    const { userInputState, inputErrorState } = initialState
    const { token } = getUser()

    const [userInputs, setUserInputs] = useState(userInputState)
    const [inputErrors, setInputErrors] = useState(inputErrorState)
    const [redirect, setRedirect] = useState(false)

    const { firstName, lastName, mobileNumber, address, city, state, country, zipcode, deliveryType } = userInputs
    const { firstNameError, lastNameError, mobileNumberError, addressError, cityError, stateError, countryError, zipcodeError, deliveryTypeError } = inputErrors
    const { cartItems, loading } = useSelector(memoizedcartorder)

    const dispatch = useDispatch()

    const inputChangeHandler = (e, { name, value }) => {
        if (name === "mobileNumber" || name === "zipcode") {
            const regex = /^$|^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/
            if (regex.test(value)) {
                setUserInputs({ ...userInputs, [name]: value })
            }
        } else {
            setUserInputs({ ...userInputs, [name]: value })
        }
    }
    const validation = () => {
        return {
            firstNameError: requireField(firstName),
            lastNameError: requireField(lastName),
            mobileNumberError: mobileNumberValidator(mobileNumber),
            addressError: requireField(address),
            cityError: requireField(city),
            stateError: requireField(state),
            countryError: requireField(country),
            zipcodeError: zipCodeValidator(zipcode),
            deliveryTypeError: requireField(deliveryType)
        }
    }
    const orderCheckoutHandler = async () => {
        const validateForm = validation()
        if (!isObjectEmpty(validateForm)) {
            setInputErrors({ ...inputErrors, ...validateForm })
        }
        const addedProduct = cartItems.map(item => {
            return { product_id: item._id, qty: item.quantity }
        })
        const order = {
            products: addedProduct,
            shipping_address: address,
            permanent_address: address,
            delivery: deliveryType
        }
        await dispatch(initCreateOrder(order, token))
        setRedirect(true)
    }

    const cartProdList = cartItems.map(item => {
        return <CartCard
            key={item._id}
            title={item.product_name}
            image={`data:${item.product_image.contentType};base64,${item.product_image.name}`}
            price={item.product_price}
            quantity={item.quantity}
            totalPrice={item.product_price * item.quantity}
        />
    })

    const grandTotal = cartItems.map(item => item.product_price * item.quantity).reduce((sum, val) => sum + val, 0)
    return (
        <React.Fragment>
            {!loading && redirect ? <Redirect to="/orders" /> : null}
            {loading ? <Loader /> : null}
            <CheckoutContainer>
                <Container>
                    <MainHeading>Checkout Cart</MainHeading>
                    <FlexWrapper>
                        <FormContainer onSubmit={(e) => {
                            e.preventDefault()
                            orderCheckoutHandler()
                        }}>
                            <Sublabel content="1">Personal Details</Sublabel>
                            <FormContainer.Group>
                                <FormContainer.Field width={6}>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={inputChangeHandler}
                                        error={firstNameError}
                                        transparent
                                    />
                                </FormContainer.Field>

                                <FormContainer.Field width={6}>
                                    <Label>last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={inputChangeHandler}
                                        error={lastNameError}
                                        transparent
                                    />
                                </FormContainer.Field>
                            </FormContainer.Group>
                            <FormContainer.Group>
                                <FormContainer.Field width={6}>
                                    <Label>Mobile Number</Label>
                                    <Input
                                        type="text"
                                        name="mobileNumber"
                                        value={mobileNumber}
                                        onChange={inputChangeHandler}
                                        error={mobileNumberError}
                                        transparent
                                    />
                                </FormContainer.Field>
                            </FormContainer.Group>

                            <Sublabel content="2">Shipping Details</Sublabel>
                            <FormContainer.Group>
                                <FormContainer.Field width={12}>
                                    <Label>Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={inputChangeHandler}
                                        error={addressError}
                                        transparent
                                    />
                                </FormContainer.Field>
                                <FormContainer.Field width={4}>
                                    <Label>City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={inputChangeHandler}
                                        error={cityError}
                                        transparent
                                    />
                                </FormContainer.Field>
                            </FormContainer.Group>

                            <FormContainer.Group>
                                <FormContainer.Field width={6}>
                                    <Label>State</Label>
                                    <Input
                                        type="text"
                                        name="state"
                                        value={state}
                                        onChange={inputChangeHandler}
                                        error={stateError}
                                        transparent
                                    />
                                </FormContainer.Field>
                                <FormContainer.Field width={6}>
                                    <Label>Country</Label>
                                    <Select
                                        name="country"
                                        value={country}
                                        options={countries}
                                        onChange={inputChangeHandler}
                                        error={countryError}
                                        transparent
                                    />
                                </FormContainer.Field>
                            </FormContainer.Group>
                            <FormContainer.Field width={4}>
                                <Label>Zip Code</Label>
                                <Input
                                    type="text"
                                    name="zipcode"
                                    value={zipcode}
                                    onChange={inputChangeHandler}
                                    error={zipcodeError}
                                    transparent
                                />
                            </FormContainer.Field>

                            <Sublabel content="3">Delivery Type</Sublabel>
                            <FormContainer.Field width={6}>
                                <Label>Payment Mode</Label>
                                <Select
                                    name="deliveryType"
                                    value={deliveryType}
                                    options={delivery}
                                    onChange={inputChangeHandler}
                                    error={deliveryTypeError}
                                />
                            </FormContainer.Field>

                            <ButtonContainer>
                                <OrderButton>Order</OrderButton>
                                <OrderButton secondary>Cancel Order</OrderButton>
                            </ButtonContainer>


                        </FormContainer>

                        <CartDetail>
                            {cartProdList.length > 0 ?
                                <React.Fragment>
                                    <ScrollBar>
                                        {cartProdList}
                                    </ScrollBar>
                                    <ChargesContainer>
                                        <ChargesLabel>
                                            <div>Grand Total</div>
                                            <div>Delivery Charges</div>
                                        </ChargesLabel>
                                        <ChargesValue>
                                            <div>{grandTotal}</div>
                                            <div>Free</div>
                                        </ChargesValue>
                                    </ChargesContainer>
                                </React.Fragment>

                                : <Text>"No item added to cart!!!"</Text>
                            }
                        </CartDetail>
                    </FlexWrapper>
                </Container>
            </CheckoutContainer>
        </React.Fragment>
    )
}

export default Checkout