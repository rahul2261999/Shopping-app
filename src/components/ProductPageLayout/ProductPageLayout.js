import React, { useState } from 'react'
import Wrapper from '../../hoc/Wrapper'

import ProductCard from '../../utilities/ProductCard/ProductCard'
import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate'
import Men from '../../assests/banner/men.jpg'
import {FaMinus,FaPlus} from 'react-icons/fa'

import {
    HeaderTag,
    ProductContainer,
    WrapperData,
    Container,
    ProductImage,
    ScrollBar,
    ProductDetails,
    ProductTitle,
    ProductLabel,
    DetailText,
    Icon,
    AddItem,
    Input,
    Button,
    Description

} from './style'

const ProductPage = props =>{

    const [isPreview,setIsPreview] = useState(false)

    const {title,products} = props


    const ShowProduct = products.map(item=>{
        return (
            <ProductCard 
                key={item.product_id}
                title={item.product_name}
                image={item.product_image}
                price={item.product_price}
                category={item.product_cate}
                openPreviewModal={()=>setIsPreview(true)}
            />
        )
    })
    return(
        <Wrapper>
            <HeaderTag>{title}</HeaderTag>
            <ProductContainer>{ShowProduct}</ProductContainer>
            {isPreview?
                <ModalTemplate
                    modalTitle="Product Preview"
                    headerTitle="Product Details"
                    isMount={isPreview}
                    isModalOpen={setIsPreview}
                >
                    <WrapperData>
                        <ProductImage src={Men}/>
        
                        <ProductDetails>
                                <ProductTitle>Product Title Here</ProductTitle>
                                <Container>
                                    <div>
                                        <ProductLabel>Category</ProductLabel>
                                        <DetailText>Unisex</DetailText>
                                    </div>
                                    <div>
                                        <ProductLabel>Stock Availabel</ProductLabel>
                                        <DetailText>10 Pieces</DetailText>
                                    </div>
                                </Container>
                                <Container>
                                    <AddItem>
                                        <Icon as={FaMinus} />
                                        <Input value="0" />
                                        <Icon as={FaPlus} />
                                        <Button>Add To Cart</Button>
                                    </AddItem>
                                </Container>
                                <Container>
                                    <div>
                                        <ProductLabel>Product Description</ProductLabel>
                                        <ScrollBar>
                                            <Description>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                            </Description>
                                        </ScrollBar>
                                    </div>
                                </Container>
                        </ProductDetails>
                    </WrapperData>
                </ModalTemplate>
            :null}
        </Wrapper>
    )
}

export default ProductPage