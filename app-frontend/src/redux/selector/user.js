import {createSelector} from 'reselect'

export const memoizedUser = createSelector(
    state => state.user,
   (userData)=>{
       const {openModal,user,token,redirect,loading,allUsers} = userData
       return {
        openModal,
           user,
           token,
           redirect,
           loading,
           allUsers
       }
   }
)