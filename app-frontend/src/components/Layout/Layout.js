import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../hoc/Wrapper';
import NavigationBar from '../../utilities/NavigationBar/TopBar/NavigationBar';
import AuthModal from '../Auth/Auth';
import Cart from '../Cart/Cart';
import { memoizedUser } from '../../redux/selector/user';
import { memoizedcartorder } from '../../redux/selector/cartorder';
import { isAuthenticated, openAuthModal, signOut } from '../../redux/actions/user';
import { addItemToCart, initializeCart, removeItemFormCart } from '../../redux/actions/cartorder';
import { cartHelper } from '../../utilities/helperFunction';

import { ContentContainer } from './styled';

const Layout = (props) => {
  const { user, token } = useSelector(memoizedUser);
  const { cartItems } = useSelector(memoizedcartorder);
  const { openModal, redirect } = useSelector(memoizedUser);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const history = useHistory();

  const openModel = () => {
    dispatch(openAuthModal(true));
  };

  const openCart = () => {
    setShowCart((prevState) => !prevState);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const prodQuantityHandler = (product, type) => {
    if (type === 'DEC') {
      if (product.quantity > 1) {
        const newCart = cartHelper(product, product.quantity - 1);
        return dispatch(addItemToCart(newCart));
      }
      return removeItemFromCartHandler(product._id);
    }

    if (type === 'INC') {
      if (product.product_stock > product.quantity) {
        const newCart = cartHelper(product, product.quantity + 1);
        return dispatch(addItemToCart(newCart));
      }
    }
  };

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFormCart(id));
  };

  const checkoutHandler = () => {
    setShowCart(false);
    history.push('checkout/orderinformation');
  };

  const userSignoutHandler = () => {
    dispatch(signOut(user));
    history.replace('/');
  };

  useEffect(() => {
    dispatch(isAuthenticated());
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <Wrapper>
      <NavigationBar
        user={user}
        toggleCart={openCart}
        openModel={openModel}
        userSignout={userSignoutHandler}
      />
      <AuthModal openModal={openModal} redirect={redirect} />
      <ContentContainer>{props.children}</ContentContainer>
      {user && token ? (
        <Cart
          show={showCart}
          closeCart={closeCart}
          addedProduct={cartItems}
          changeQty={prodQuantityHandler}
          removeProduct={removeItemFromCartHandler}
          checkout={checkoutHandler}
        />
      ) : null}
    </Wrapper>
  );
};

export default Layout;
