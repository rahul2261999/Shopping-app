import axios from '../../axios'
import {put} from 'redux-saga/effects'
import {fetchAllProductSuccess,fetchSingleProductSuccess, deleteProductSuccess, closeModal, fetchAllProduct } from '../actions/product'
import {successToaster,errorToaster} from '../actions/toaster'


export function* getAllProduct(){
   try {
      const response = yield axios.get('allproducts');
      yield put(fetchAllProductSuccess(response.data))
   } catch (error) {
      yield put(errorToaster("Network error"))
   }
}

export function* addNewProduct(action){
   const {token,userId,productData} = action.payload
   try {
    const response = yield axios.post(`addproduct/${userId}`,productData,{
       headers:{
         "Content-Type":"multipart/form-data",
         "authorization":`Bearer ${token}`
       }
    })
    yield put(closeModal())
    yield put(successToaster(response.data.msg))
    yield put(fetchAllProduct())
   } catch (error) {
    yield put(errorToaster(error.response.data.error))
   }

}

export function* updateProduct(action){
   const {token,userId,productId,productData} = action.payload
   console.log(action.payload)
   try {
      const response = yield axios.put(`product/${productId}/${userId}`,productData,{
         headers:{
            "Content-Type":"multipart/form-data ",
            "authorization":`Bearer ${token}`
         }
      })
      yield put(closeModal())
      yield put (successToaster(response.data.msg))
      yield put(fetchAllProduct())
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
   const {token,prodId,userId} = action.payload
   try {
      const response = yield axios.delete(`product/${prodId}/${userId}`,{
         headers:{
            "authorization":`Bearer ${token}`
         }
      })
      yield put(successToaster(response.data.msg))
      yield put(deleteProductSuccess(prodId))
   } catch (error) {
      yield put(errorToaster(error.response.data.error))
      
   }
}
