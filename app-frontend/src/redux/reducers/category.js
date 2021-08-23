import _ from 'lodash';

import {
  ADD_CATEGORY_SUCCESS,
  CLOSE_CATEGORY_MODAL,
  EDIT_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_SUCESS,
  OPEN_CATEGORY_MODAL,
  REMOVE_CATEGORY_SUCCESS,
  RESET_CATEGORY, RESET_PRODUCT
} from '../actionTypes';

const initalState = {
  loading: false,
  modal: false,
  allCategories: []
};

const categoryReducer = (state = initalState, action) => {
  switch (action.type) {
  case OPEN_CATEGORY_MODAL:
    return {
      ...state,
      modal: true
    };

  case CLOSE_CATEGORY_MODAL:
    return {
      ...state,
      modal: false
    };

  case FETCH_ALL_CATEGORY_SUCESS:
    return {
      ...state,
      allCategories: action.payload
    };

  case ADD_CATEGORY_SUCCESS: {
    return {
      ...state,
      allCategories: state.allCategories.concat(action.payload),
      modal: false
    };
  }
  case EDIT_CATEGORY_SUCCESS:
    const { _id, updatedCate } = action.payload;
    const index = _.findIndex(state.allCategories, (item) => item._id === _id);
    const updateList = [..._.slice(state.allCategories, 0, index), updatedCate, ..._.slice(state.allCategories, index + 1)];
    return {
      ...state,
      allCategories: updateList,
      modal: false
    };

  case REMOVE_CATEGORY_SUCCESS: {
    const removeCategory = state.allCategories.filter((item) => item._id !== action.payload);
    return {
      allCategories: removeCategory
    };
  }

  case RESET_PRODUCT:
    return {
      ...initalState
    };

  case RESET_CATEGORY:
    return {
      ...initalState
    };

  default:
    return state;
  }
};

export default categoryReducer;
