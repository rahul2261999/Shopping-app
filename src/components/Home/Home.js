import React from 'react'

import female from '../../assests/banner/femal.jpg'
import men from '../../assests/banner/men.jpg'
import shoes from '../../assests/banner/shoes.jpg'

import ContainerWrapper from '../../hoc/Wrapper'
import ProductLayout from '../ProductPageLayout/ProductPageLayout'
import Card from '../../utilities/ProductCard/ProductCard'

import {
    Wrapper,
    CardContainer,
    PromotionCard,
    Text,
} from './style'

const Home = props =>{
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
            <ProductLayout title="All Categories" products={null} />

           <div style={{display:'flex',flexWrap:'wrap'}}>
           <Card/>
            <Card/>
           </div>


        </ContainerWrapper>
    )
}

export default Home