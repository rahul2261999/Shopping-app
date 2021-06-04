import axios from '../../axios'
import {put} from 'redux-saga/effects'
import { createProductSuccess, fetchAllProductSuccess, updateProductSuccess,fetchSingleProductSuccess, deleteProductSuccess } from '../actions/product'
import {successToaster,errorToaster} from '../actions/toaster'


export function* getAllProduct(){
   try {
      const response = yield axios.get('product');
      yield put(fetchAllProductSuccess(response.data))
   } catch (error) {
      yield put(errorToaster("Network error"))
   }
}

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

export function* updateProduct(action){
   const {token,userId,prodId,productData} = action.payload
   console.log(action.payload.productData)
   try {
      const response = yield axios.put(`product/${prodId}/${userId}`,productData,{
         headers:{
            "authorization":`Bearer ${token}`
         }
      })
      yield put(updateProductSuccess(response.data))
      yield put (successToaster("Product edited successfully"))
   } catch (error) {
      yield put(errorToaster(error.response.data.error))
   }
}

export function* getProductDetail(action){
   const {prodId} = action.payload
   try {
      const response = yield axios.get(`product/${prodId}`)
      yield put(fetchSingleProductSuccess(response.data))
   } catch (error) {
      yield put(errorToaster(error.response.data.error))
   }
}

export function* deleteProduct(action){
   const {prodId,userId} = action.payload
   try {
      const response = yield axios.delete(`product/${prodId}/${userId}`)
      yield put(deleteProductSuccess(response.data._id))
   } catch (error) {
      yield put(errorToaster(error.response.data.error))
      
   }
}
