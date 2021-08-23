import React from 'react';
import {
  FaShoppingBag, FaRupeeSign, FaTrash, FaPen
} from 'react-icons/fa';

import {
  Card,
  CardContainer,
  DetailBody,
  ProductTitle,
  ProductImage,
  DetailWrapper,
  CartIcon,
  Price

} from './style';

const ProductCard = (props) => {
  const {
    title, image, category, price, openPreviewModal, isAdmin, onEdit, onDelete
  } = props;
  return (
    <Card>
      <CardContainer>
        <ProductImage src={image} alt="prod1" />
        <DetailBody>
          <ProductTitle>{title}</ProductTitle>
          <DetailWrapper>
            <span>{category}</span>
            {isAdmin
              ? (
                <div>
                  <CartIcon as={FaPen} onClick={onEdit} />
                  <CartIcon as={FaTrash} onClick={onDelete} />
                </div>
              )
              : <CartIcon as={FaShoppingBag} onClick={openPreviewModal} />}

          </DetailWrapper>
          <Price>
            <FaRupeeSign />
            {' '}
            {price}
          </Price>
        </DetailBody>
      </CardContainer>
    </Card>
  );
};

export default ProductCard;
