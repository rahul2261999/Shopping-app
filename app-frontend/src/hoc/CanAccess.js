import React from 'react'
import {useSelector} from 'react-redux'
import { memoizedUser } from '../redux/selector/user'
import {Redirect, Route} from 'react-router-dom'
import DashLayout from '../components/Dashboard/MainLayout/DashLayout'
import Layout from '../components/Layout/Layout'
const CanAcess = ({component:Component,adminRoute,...rest}) =>{
    const {token,user} = useSelector(memoizedUser)
    if(token&&user&&user.isAdmin===1){
        return (
            <DashLayout>
                <Route {...rest} render={props=>adminRoute?<Component {...props} />:<Redirect to="/dashboard"/> } />
            </DashLayout>
        )
        
    }
    if(!adminRoute){
        return (
            <Layout>
                <Route {...rest} render={props=><Component {...props} />} />
            </Layout>
        )
    }

    return <Redirect to="/" />

    
}

export default CanAcess