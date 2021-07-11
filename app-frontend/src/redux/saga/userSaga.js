import {call, put} from 'redux-saga/effects'
import axios from '../../axios'
import { getUser } from '../../utilities/helperFunction'
import { errorToaster, successToaster } from '../actions/toaster'
import {
    userLoginSucess,
    closeAuthModal,
    authenticationSuceess,
    authenticationFail,
    signOutSuccess,
    getAllUserSuccess,
    fetchUserFailed
} from '../actions/user'

export function* signup(action){   
    try {
        const response = yield axios.post('signup',action.payload)
        yield put(closeAuthModal(false))
        yield put(successToaster(response.data.msg))
    } catch (error) {
        yield put(errorToaster(error.response.data.error))
    }
}

export function* userSignin(action){

    try {
        const response = yield axios.post('signin',action.payload)
        if(response.data.msg){
            yield put(successToaster(response.data.msg))
            yield put(closeAuthModal(false))

        }else{
            yield localStorage.setItem("token",response.data.token)
            yield localStorage.setItem("user",JSON.stringify(response.data.user))
            yield put(userLoginSucess(response.data))
            yield put(closeAuthModal(false))
        }
       

    } catch (error) {
        if(error.response.data.error){
            yield put(errorToaster(error.response.data.error))
        }
    }
}

export function* userSignout(action){
    yield call([localStorage,'clear'])
    yield put(signOutSuccess(action.payload))
}

export function* isAuthenticated(){
    
    if(getUser()){
        const {token,user} = yield getUser()
        yield put(authenticationSuceess({token,user})) 
    }
    else{
        yield put(authenticationFail())

    }
    
      
}

export function* fetchUsers(action){
    try {
        const response = yield axios.post('/allusers',{},{
            headers:{
                "authorization":`Bearer ${action.payload}`
            }
        })
        yield put(getAllUserSuccess(response.data))
    } catch (error) {
        if(error.response.data.error){
            yield put(fetchUserFailed())
        }
    }
}