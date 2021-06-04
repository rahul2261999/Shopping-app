import axios from '../../axios'
import {put} from 'redux-saga/effects'
import { createProductSuccess } from '../actions/product'
import {successToaster,errorToaster} from '../actions/toaster'


export function* getAllProduct(action){
   try {
      const response = yield axios.get('product')
   } catch (error) {
      
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
      const respone = yield axios.put(`product/${prodId}/${userId}`,productData,{
         headers:{
            "authorization":`Bearer ${token}`
         }
      })
      console.log(respone)

   } catch (error) {
      
   }
}

export function* getProductDetail(action){
   const {prodId,userId} = action.payload
   try {
      const respone = yield axios.post(`product/${prodId}/${userId}`)
   } catch (error) {
      
   }
}

export function* deleteProduct(action){
   const {prodId,userId} = action.payload
   try {
      const respone = yield axios.delete(`product/${prodId}/${userId}`)
   } catch (error) {
      
   }
}
