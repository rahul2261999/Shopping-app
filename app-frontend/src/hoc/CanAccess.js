import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import DashLayout from '../components/Dashboard/MainLayout/DashLayout'
import Layout from '../components/Layout/Layout'
import { getUser } from '../utilities/helperFunction'
const CanAcess = ({component:Component,adminRoute,...rest}) =>{
    const {token,user} = getUser()
    if(token&&user&&user.isAdmin===1){
        return (
            <DashLayout>
                <Route {...rest} render={props=>adminRoute?<Component {...props} />:<Redirect to="/dashboard"/> } />
            </DashLayout>
        )
        
    }else if(!adminRoute){
        return (
            <Layout>
                <Route {...rest} render={props=><Component {...props} />} />
            </Layout>
        )
    }else{
       return <Redirect to="/" />
    }
}

export default CanAcess