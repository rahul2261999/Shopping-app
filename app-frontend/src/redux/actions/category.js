import { ADD_CATEGORY, ADD_CATEGORY_SUCCESS, CLOSE_CATEGORY_MODAL, EDIT_CATEGORY, EDIT_CATEGORY_SUCCESS, FETCH_ALL_CATEGORY, FETCH_ALL_CATEGORY_SUCESS, OPEN_CATEGORY_MODAL, REMOVE_CATEGORY, REMOVE_CATEGORY_SUCCESS } from "../actionTypes"

export const fetchAllCategories = token =>{
    return {
        type:FETCH_ALL_CATEGORY,
        payload:token
    }
}

export const fetchAllCategoriesSuccess = cate =>{
    return {
        type:FETCH_ALL_CATEGORY_SUCESS,
        payload:cate
    }
}

export const addCategory = (data,token) =>{
    return{
        type:ADD_CATEGORY,
        payload:{data,token}
    }
}

export const addCategorySuccess = data =>{
    return{
        type:ADD_CATEGORY_SUCCESS,
        payload:data
    }
}

export const editCategory = (_id,cateData,token) =>{
    return{
        type:EDIT_CATEGORY,
        payload:{_id,cateData,token}
    }
}

export const editCategorySuccess = data =>{
    return{
        type:EDIT_CATEGORY_SUCCESS,
        payload:data
    }
}

export const removeCategory = (cateId,token) =>{
    return{
        type:REMOVE_CATEGORY,
        payload:{cateId,token}
    }
}
export const removeCategorySuccess = data =>{
    return{
        type:REMOVE_CATEGORY_SUCCESS,
        payload:data
    }
}

export const openCateModal = () => {
    return {
        type:OPEN_CATEGORY_MODAL
    }
}

export const closeCateModal = () => {
    return {
        type:CLOSE_CATEGORY_MODAL
    }
}