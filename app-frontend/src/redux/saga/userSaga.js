import {call, put} from 'redux-saga/effects'
import axios from '../../axios'
import {
    userLoginSucess,
    closeAuthModal,
    authenticationSuceess,
    authenticationFail
} from '../actions/user'

export function* signup(action){   
    try {
        const response = yield axios.post('signup',action.payload)
        yield put(closeAuthModal(false))
    } catch (error) {
        console.log(error.response.data.error)
    }
}

export function* userSignin(action){

    try {
        const response = yield axios.post('signin',action.payload)
        yield localStorage.setItem("token",response.data.token)
        yield localStorage.setItem("user",JSON.stringify(response.data.user))
        yield put(userLoginSucess(response.data))
        yield put(closeAuthModal(false))

    } catch (error) {
        console.log(error.response.data.error)
    }
}

export function* userSignout(action){
    yield call([localStorage,'clear'])
}

export function* isAuthenticated(action){
    if(typeof window == undefined){
        return false
      }
      if(localStorage.getItem("token")&&localStorage.getItem("user")){
        const token = yield localStorage.getItem("token")
        const user = yield JSON.parse(localStorage.getItem("user"))
        put(authenticationSuceess({token,user})) 
      }else{
          put(authenticationFail())
      }
}