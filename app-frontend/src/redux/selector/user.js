import {createSelector} from 'reselect'

export const memoizedUser = createSelector(
    state => state.user,
   (userData)=>{
       const {openModal,user,token,isAuthenticated} = userData
       return {
        openModal,
           user,
           token,
       }
   }
)