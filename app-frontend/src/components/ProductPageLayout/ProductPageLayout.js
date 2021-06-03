import React, { useState } from 'react'
import Wrapper from '../../hoc/Wrapper'

import ProductCard from '../../utilities/ProductCard/ProductCard'
import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate'
import {FaMinus,FaPlus,FaRupeeSign} from 'react-icons/fa'

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

    const [previewModal,setPreviewModal] = useState({
        modalOpen:false,
        selectedProduct:null
    })

    const [productQuantity,setProductQuantity]  = useState(1)

    const {title,products,isAdmin,editProduct} = props
    const {modalOpen,selectedProduct} = previewModal

    const modalPreviewHandler = (id) =>{
        const selectedProduct = products.find(item=>item.product_id===id)
        setPreviewModal({...previewModal,modalOpen:true,selectedProduct:selectedProduct})
    }

    const closeModal = ()=>{
        setPreviewModal({...previewModal,modalOpen:false})
    }

    const prodQuantityHandler = type =>{
        if(productQuantity>1){
            if(type==="DEC"){
                setProductQuantity(prevState=>prevState-1)
            }
        }

        if(selectedProduct.stock>productQuantity){
            if(type==="INC"){
                setProductQuantity(prevState=>prevState+1)
            }
        }
    }


    const ShowProduct = products.map(item=>{
        return (
            <ProductCard 
                key={item.product_id}
                title={item.product_name}
                image={item.product_image}
                price={item.product_price}
                category={item.product_cate}
                openPreviewModal={()=>modalPreviewHandler(item.product_id)}
                isAdmin={isAdmin}
                onEdit={()=>editProduct(item.product_id)}
            />
        )
    })
    return(
        <Wrapper>
            <HeaderTag>{title}</HeaderTag>
            <ProductContainer>{ShowProduct}</ProductContainer>
            {modalOpen?
                <ModalTemplate
                    modalTitle="Product Preview"
                    headerTitle="Product Details"
                    isMount={modalOpen}
                    isModalOpen={closeModal}
                >
                    <WrapperData>
                        <ProductImage src={selectedProduct.product_image}/>
        
                        <ProductDetails>
                                <ProductTitle>{selectedProduct.product_name}</ProductTitle>
                                <Container>
                                    <div>
                                        <ProductLabel>Category</ProductLabel>
                                        <DetailText>{selectedProduct.product_cate}</DetailText>
                                    </div>
                                    <div>
                                        <ProductLabel>Price</ProductLabel>
                                        <DetailText><FaRupeeSign/>{selectedProduct.product_price}</DetailText>
                                    </div>
                                    <div>
                                        <ProductLabel>Stock Availabel</ProductLabel>
                                        <DetailText>{selectedProduct.stock} Pieces</DetailText>
                                    </div>
                                </Container>
                                <Container>
                                    <AddItem>
                                        <Icon as={FaMinus} onClick={()=>prodQuantityHandler("DEC")}  />
                                        <Input value={productQuantity} />
                                        <Icon as={FaPlus} onClick={()=>prodQuantityHandler("INC")} />
                                        <Button>Add To Cart</Button>
                                    </AddItem>
                                </Container>
                                <Container>
                                    <div>
                                        <ProductLabel>Product Description</ProductLabel>
                                        <ScrollBar>
                                            <Description>
                                                {selectedProduct.product_desc}
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