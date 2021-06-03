import axios from '../../axios'
import {put} from 'redux-saga/effects'
import { createProductSuccess } from '../actions/product'
import {successToaster,errorToaster} from '../actions/toaster'

export function* addNewProduct(action){
   try {
    const respone = yield axios.post('addproduct',action.payload)
    console.log(respone)
    yield put(createProductSuccess(respone.data))
    yield put(successToaster("Product added successfully"))
   } catch (error) {
    yield put(errorToaster(error.respone.data.error))
   }

}