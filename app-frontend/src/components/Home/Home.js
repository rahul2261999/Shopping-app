import React, { useEffect } from 'react'

import female from '../../assests/banner/femal.jpg'
import men from '../../assests/banner/men.jpg'
import shoes from '../../assests/banner/shoes.jpg'

import ContainerWrapper from '../../hoc/Wrapper'
import ProductLayout from '../ProductPageLayout/ProductPageLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProduct } from '../../redux/actions/product'
import { isAuthenticated } from '../../redux/actions/user'
import Loader from '../../utilities/Loader/Loader'

import {
    Wrapper,
    CardContainer,
    PromotionCard,
    Text,
} from './style'
import memoizedProducts from '../../redux/selector/products'

const Home = () => {
    const { allProducts, productLoader } = useSelector(memoizedProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!allProducts.length) {
            dispatch(fetchAllProduct())
        }
        dispatch(isAuthenticated())
    }, [dispatch])

    return (
        <ContainerWrapper>
            <Wrapper>
                <CardContainer>
                    <PromotionCard bgImage={female} ><Text>New Arrivals</Text></PromotionCard>
                </CardContainer>
                <CardContainer>
                    <PromotionCard bgImage={men} ><Text>Mens Collection</Text></PromotionCard>
                </CardContainer>
                <CardContainer>
                    <PromotionCard bgImage={shoes} ><Text>Branded Shoes</Text></PromotionCard>
                </CardContainer>
            </Wrapper>
            <ProductLayout title="All Products" products={allProducts} >
                {productLoader ? <Loader absolute /> : null}
            </ProductLayout>
        </ContainerWrapper>
    )
}

export default Home