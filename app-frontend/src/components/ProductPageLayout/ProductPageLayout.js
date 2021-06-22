import React, { useEffect, useState } from 'react'
import Wrapper from '../../hoc/Wrapper'
import { useDispatch } from 'react-redux'
import ProductCard from '../../utilities/ProductCard/ProductCard'
import ModalTemplate from '../../utilities/ModalTemplate/ModalTemplate'
import { FaMinus, FaPlus, FaRupeeSign } from 'react-icons/fa'

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
import { addItemToCart } from '../../redux/actions/cartorder'
import { cartHelper } from '../../utilities/helperFunction'

const ProductPage = props => {
    const dispatch = useDispatch()
    const [previewModal, setPreviewModal] = useState({
        modalOpen: false,
        selectedProduct: null
    })

    const [productQuantity, setProductQuantity] = useState(1)

    const { title, products, isAdmin, editProduct, deletoProduct } = props
    const { modalOpen, selectedProduct } = previewModal


    const modalPreviewHandler = (id) => {
        const selectedProduct = products.find(item => item._id === id)
        setPreviewModal({ ...previewModal, modalOpen: true, selectedProduct: selectedProduct })
    }

    const closeModal = () => {
        setPreviewModal({ ...previewModal, modalOpen: false })
    }

    const prodQuantityHandler = type => {
        if (type === "DEC") {
            if (productQuantity > 0) {
                return setProductQuantity(prevState => prevState - 1)
            }
            // else part alert todo
        }

        if (type === "INC") {
            if (selectedProduct.product_stock > productQuantity) {
                return setProductQuantity(prevState => prevState + 1)
            }

        }
    }

    const addToCartHandler = async () => {
        let newCart = cartHelper(selectedProduct, productQuantity)
        await dispatch(addItemToCart(newCart))
        closeModal(false)
    }

    useEffect(() => {
        setProductQuantity(0)
    }, [modalOpen])


    const ShowProduct = products.map(item => {
        return (
            <ProductCard
                key={item._id}
                title={item.product_name}
                image={`data:${item.product_image.contentType};base64,${item.product_image.name}`}
                price={item.product_price}
                category={item.product_category.category_name}
                openPreviewModal={() => modalPreviewHandler(item._id)}
                isAdmin={isAdmin}
                onEdit={() => editProduct(item._id)}
                onDelete={() => deletoProduct(item._id)}
            />
        )
    })
    return (
        <Wrapper>
            <HeaderTag>{title}</HeaderTag>
            <ProductContainer>{ShowProduct}</ProductContainer>
            {modalOpen ?
                <ModalTemplate
                    modalTitle="Product Preview"
                    headerTitle="Product Details"
                    isMount={modalOpen}
                    isModalOpen={closeModal}
                >
                    <WrapperData>
                        <ProductImage src={`data:${selectedProduct.product_image.contentType};base64,${selectedProduct.product_image.name}`} />

                        <ProductDetails>
                            <ProductTitle>{selectedProduct.product_name}</ProductTitle>
                            <Container>
                                <div>
                                    <ProductLabel>Category</ProductLabel>
                                    <DetailText>{selectedProduct.product_category.category_name}</DetailText>
                                </div>
                                <div>
                                    <ProductLabel>Price</ProductLabel>
                                    <DetailText><FaRupeeSign />{selectedProduct.product_price}</DetailText>
                                </div>
                                <div>
                                    <ProductLabel>Stock Availabel</ProductLabel>
                                    <DetailText>{selectedProduct.product_stock} Pieces</DetailText>
                                </div>
                            </Container>
                            <Container>
                                <AddItem>
                                    <Icon as={FaMinus} onClick={() => prodQuantityHandler("DEC")} />
                                    <Input value={productQuantity} />
                                    <Icon as={FaPlus} onClick={() => prodQuantityHandler("INC")} />
                                    <Button onClick={addToCartHandler} disabled={!productQuantity > 0}>Add To Cart</Button>
                                </AddItem>
                            </Container>
                            <Container>
                                <div>
                                    <ProductLabel>Product Description</ProductLabel>
                                    <ScrollBar>
                                        <Description>
                                            {selectedProduct.product_description}
                                        </Description>
                                    </ScrollBar>
                                </div>
                            </Container>
                        </ProductDetails>
                    </WrapperData>
                </ModalTemplate>
                : null}
        </Wrapper>
    )
}

export default ProductPage