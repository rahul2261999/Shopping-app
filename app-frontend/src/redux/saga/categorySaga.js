import { put } from '@redux-saga/core/effects';

import axios from '../../axios';
import {
  addCategorySuccess, editCategorySuccess, fetchAllCategoriesSuccess, removeCategorySuccess
} from '../actions/category';
import { errorToaster, successToaster } from '../actions/toaster';

export function* fetchCategory(action) {
  try {
    const categories = yield axios.get('allcategories', {
      headers: {
        authorization: `Bearer ${action.payload}`
      }
    });
    yield put(fetchAllCategoriesSuccess(categories.data));
  } catch (error) {
    yield put(errorToaster('Error encountered'));
  }
}

export function* addCategory(action) {
  const { data, token } = action.payload;
  try {
    const category = yield axios.post('category/create', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    yield put(addCategorySuccess(category.data));
  } catch (error) {
    yield put(errorToaster('Error encountered'));
  }
}

export function* editCategory(action) {
  const { _id, cateData, token } = action.payload;

  try {
    const updatedCate = yield axios.put(`category/update/${_id}`, cateData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    yield put(editCategorySuccess({ _id, updatedCate: updatedCate.data }));
    yield put(successToaster('Category edited successfully'));
  } catch (error) {
    if (!error.response.data.error) {
      yield put(errorToaster('Error encountered'));
    } else {
      yield put(errorToaster(error.response.data.error));
    }
  }
}
export function* removeCategory(action) {
  const { cateId, token } = action.payload;

  try {
    const removeCategory = yield axios.delete(`category/${cateId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    yield put(removeCategorySuccess(cateId));
    yield put(successToaster(removeCategory.data.msg));
  } catch (error) {
    if (!error.response.data.error) {
      yield put(errorToaster('Error encountered'));
    } else {
      yield put(errorToaster(error.response.data.error));
    }
  }
}
