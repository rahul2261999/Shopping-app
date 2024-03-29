import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusSquare } from 'react-icons/fa';

import memoizedProducts from '../../../redux/selector/products';
import {
  closeModal, deleteProduct, fetchAllProduct, openModal, resetProduct
} from '../../../redux/actions/product';
import ProductPage from '../../ProductPageLayout/ProductPageLayout';
import { getUser } from '../../../utilities/helperFunction';
import { fetchAllCategories } from '../../../redux/actions/category';
import { memoisedCategory } from '../../../redux/selector/category';

import AddEditProdduct from './AddEditProduct/AddEditProduct';
import { HeaderBar, Icon } from './style';

const Product = () => {
  const dispatch = useDispatch();
  const { modal, allProducts } = useSelector(memoizedProducts);
  const { allCategories } = useSelector(memoisedCategory);
  const { token, user } = getUser();

  const [editForm, setEditForm] = useState(false);
  const [filterProduct, setFilterProduct] = useState('');
  const categories = allCategories.map((cate) => ({ key: cate._id, value: cate._id, text: cate.category_name }));

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllCategories(token));
    return () => dispatch(resetProduct());
  }, [dispatch, token]);

  const modalOpenHandler = () => {
    setEditForm(false);
    dispatch(openModal());
  };
  const modalCloseHandler = () => {
    setEditForm(false);
    dispatch(closeModal());
  };

  const editProductHandler = (id) => {
    setEditForm(true);
    const product = allProducts.find((prod) => prod._id === id);
    setFilterProduct(product);
    dispatch(openModal());
  };

  const deleteProductHandler = (prodId) => {
    dispatch(deleteProduct({ token, userId: user._id, prodId }));
  };

  return (
    <>
      <HeaderBar>
        <Icon on as={FaPlusSquare} onClick={modalOpenHandler} />
        {' '}
        Add New Product
      </HeaderBar>
      <ProductPage
        products={allProducts}
        isAdmin
        editProduct={editProductHandler}
        deletoProduct={deleteProductHandler}
      />
      {modal && (
        <AddEditProdduct
          edit={editForm}
          filterProduct={filterProduct}
          categories={categories}
          openModal={modal}
          closeModal={modalCloseHandler}
        />
      )}
    </>

  );
};

export default Product;
