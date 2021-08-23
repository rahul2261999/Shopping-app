import {
  ADDED_TO_CART,
  ADD_TO_CART,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  FETCH_ALL_USER_ORDER_ERROR,
  FETCH_ALL_USER_ORDER_INIT,
  FETCH_ALL_USER_ORDER_SUCCESS,
  FETCH_ORDERS, FETCH_ORDERS_SUCCESS,
  INIT_CART, INIT_CART_SUCCESS,
  REMOVE_FORM_CART,
  REMOVE_FORM_CART_SUCCESS,
  UPDATE_ORDER_STATUS_FAILED,
  UPDATE_ORDER_STATUS_INIT,
  UPDATE_ORDER_STATUS_SUCCESS,
  USER_ORDER_REQUEST_FAILED,
  USER_ORDER_REQUEST_INIT,
  USER_ORDER_REQUEST_SUCCESS
} from '../actionTypes';

export const initializeCart = () => ({
  type: INIT_CART
});
export const initializeCartSuccess = (data) => ({
  type: INIT_CART_SUCCESS,
  payload: data
});

export const addItemToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data
});

export const addedToCart = (data) => ({
  type: ADDED_TO_CART,
  payload: data
});

export const removeItemFormCart = (id) => ({
  type: REMOVE_FORM_CART,
  payload: id
});
export const removeItemFormCartSuccess = (data) => ({
  type: REMOVE_FORM_CART_SUCCESS,
  payload: data
});

// orders

export const initCreateOrder = (orderData, token) => ({
  type: CREATE_ORDER,
  payload: { orderData, token }
});

export const orderCreated = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order
});
export const initFetchOrder = () => ({
  type: FETCH_ORDERS
});

export const fetchOrderSucess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const getUserOrderInit = (data) => ({
  type: USER_ORDER_REQUEST_INIT,
  payload: data
});

export const getUserOrderSuccess = (data) => ({
  type: USER_ORDER_REQUEST_SUCCESS,
  payload: data
});

export const getUserOrderFailed = () => ({
  type: USER_ORDER_REQUEST_FAILED
});

// admin order actions
export const adminGetAllUserOrderInit = (userToken) => ({
  type: FETCH_ALL_USER_ORDER_INIT,
  payload: userToken
});

export const adminGetAllUserOrderSuccess = (orders) => ({
  type: FETCH_ALL_USER_ORDER_SUCCESS,
  payload: orders
});

export const adminGetAllUserOrderFailed = () => ({
  type: FETCH_ALL_USER_ORDER_ERROR
});

export const updateOrderStatusInit = (data) => ({
  type: UPDATE_ORDER_STATUS_INIT,
  payload: data
});

export const updateOrderStatusSuccess = (data) => ({
  type: UPDATE_ORDER_STATUS_SUCCESS,
  payload: data
});

export const updateOrderStatusFailed = () => ({
  type: UPDATE_ORDER_STATUS_FAILED
});
