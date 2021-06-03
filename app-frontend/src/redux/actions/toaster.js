import {MOUNT_TOASTER,UNMOUNT_TOASTER} from '../actionTypes'

export const successToaster = message =>{
    return {
        type:MOUNT_TOASTER,
        payload:{
            title:"SUCCESS",
            msg:message,
            mount:true
        }
    }
}

export const errorToaster = message =>{
    return {
        type:MOUNT_TOASTER,
        payload:{
            title:"ERROR",
            msg:message,
            mount:true
        }
    }
}

export const hideToaster = () =>{
    return {
        type:UNMOUNT_TOASTER
    }
}