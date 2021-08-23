import {
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  CLOSE_CATEGORY_MODAL,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY,
  FETCH_ALL_CATEGORY_SUCESS,
  OPEN_CATEGORY_MODAL,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_SUCCESS,
  RESET_CATEGORY
} from '../actionTypes';

export const fetchAllCategories = (token) => ({
  type: FETCH_ALL_CATEGORY,
  payload: token
});

export const fetchAllCategoriesSuccess = (cate) => ({
  type: FETCH_ALL_CATEGORY_SUCESS,
  payload: cate
});

export const addCategory = (data, token) => ({
  type: ADD_CATEGORY,
  payload: { data, token }
});

export const addCategorySuccess = (data) => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: data
});

export const editCategory = (_id, cateData, token) => ({
  type: EDIT_CATEGORY,
  payload: { _id, cateData, token }
});

export const editCategorySuccess = (data) => ({
  type: EDIT_CATEGORY_SUCCESS,
  payload: data
});

export const removeCategory = (cateId, token) => ({
  type: REMOVE_CATEGORY,
  payload: { cateId, token }
});
export const removeCategorySuccess = (data) => ({
  type: REMOVE_CATEGORY_SUCCESS,
  payload: data
});

export const openCateModal = () => ({
  type: OPEN_CATEGORY_MODAL
});

export const closeCateModal = () => ({
  type: CLOSE_CATEGORY_MODAL
});

export const resetCategory = () => ({
  type: RESET_CATEGORY
});
