import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllProduct } from '../../redux/actions/product';
import memoizedProducts from '../../redux/selector/products';
import ProductPage from '../ProductPageLayout/ProductPageLayout';
import Loader from '../../utilities/Loader/Loader';

const TShirt = () => {
  const dispatch = useDispatch();
  const { allProducts, productLoader } = useSelector(memoizedProducts);

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchAllProduct());
    }
  }, [allProducts, dispatch]);

  const filterProduct = allProducts.filter((item) => item.product_type === 'tshirt');

  return (
    <ProductPage title="T-Shirts" products={filterProduct}>
      {productLoader ? <Loader absolute /> : null}
    </ProductPage>
  );
};

export default TShirt;
