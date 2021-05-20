import React from 'react'
import pod from '../../assests/banner/femal.jpg'
import{
    Card,
    CardContainer,
    DetailBody,
    ProductTitle,
    PriceCateg,
    PreviewDetails

} from './style'
const ProductCard = props =>{
    return(
        <Card>
            <CardContainer>
                <img src={pod} alt="prod1" height="350px" />
                <DetailBody>
                    <ProductTitle>Zara soft cotton stuff t-shirt</ProductTitle>
                    <PriceCateg>
                        <span>Rs. 22,000</span>
                        <span>Unisex</span>
                    </PriceCateg>
                    <PreviewDetails>preview   cart</PreviewDetails>
                </DetailBody>
            </CardContainer>
        </Card>
    )
}

export default ProductCard