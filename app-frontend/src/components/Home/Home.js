import React from 'react'

import female from '../../assests/banner/femal.jpg'
import men from '../../assests/banner/men.jpg'
import shoes from '../../assests/banner/shoes.jpg'

import ContainerWrapper from '../../hoc/Wrapper'
import ProductLayout from '../ProductPageLayout/ProductPageLayout'
import {useSelector} from 'react-redux'

import {
    Wrapper,
    CardContainer,
    PromotionCard,
    Text,
} from './style'
import memoizedProducts from '../../redux/selector/products'

const Home = props =>{
    const {allProducts} = useSelector(memoizedProducts)
    return(
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
            <ProductLayout title="All Categories" products={allProducts} />
        </ContainerWrapper>
    )
}

export default Home