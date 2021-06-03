import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { hideToaster } from '../../redux/actions/toaster'
import { toaster } from '../../redux/selector/toaster'

import {ToasterBox,Msg}from './style'

const Toaster = () =>{
    const {title,msg,mount} = useSelector(toaster)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(mount){
           setTimeout(()=>{
            dispatch(hideToaster())
           },4000)
        }
    },[title,msg,mount,dispatch])


    return(
            <ToasterBox isMount={mount} type={title}>
                <Msg>{msg}</Msg>
            </ToasterBox>
    )
}

export default Toaster