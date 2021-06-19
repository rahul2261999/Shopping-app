import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Wrapper from '../../hoc/Wrapper'
import NavigationBar from '../../utilities/NavigationBar/TopBar/NavigationBar'
import AuthModal from '../Auth/Auth'
import Cart from '../Cart/Cart'
import {Product} from '../../assests/raw-data/raw-data'


import {ContentContainer} from './styled'
import { memoizedUser } from '../../redux/selector/user'
import { isAuthenticated, openAuthModal } from '../../redux/actions/user'

const Layout = props =>{
    const {user,token}  =useSelector(memoizedUser)
    const dispatch = useDispatch()
    const [showCart,setShowCart] = useState(false)

    const openModel = ()=>{
        dispatch(openAuthModal(true))
    }

    const openCart = () =>{
        setShowCart(prevState=>!prevState)
    }

    const closeCart = () =>{
        setShowCart(false)
    }


    useEffect(()=>{
        dispatch(isAuthenticated())
    },[dispatch])

    return(
            <Wrapper>
                <NavigationBar user={user} toggleCart={openCart} openModel={openModel}  />
                <AuthModal />
                <ContentContainer>{props.children}</ContentContainer>
                {user&&token?<Cart show={showCart} closeCart={closeCart} addedProduct={Product}/>:null}    
            </Wrapper>
    )
}

export default Layout