import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Wrapper from '../../hoc/Wrapper'
import NavigationBar from '../../utilities/NavigationBar/TopBar/NavigationBar'
import AuthModal from '../Auth/Auth'
import Cart from '../Cart/Cart'

import {ContentContainer} from './styled'
import { memoizedUser } from '../../redux/selector/user'
import { memoizedcartorder } from '../../redux/selector/cartorder'
import { isAuthenticated, openAuthModal } from '../../redux/actions/user'
import { initializeCart } from '../../redux/actions/cartorder'

const Layout = props =>{
    const {user,token}  =useSelector(memoizedUser)
    const {cartItems} = useSelector(memoizedcartorder)
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
        dispatch(initializeCart())
    },[dispatch])

    return(
            <Wrapper>
                <NavigationBar user={user} toggleCart={openCart} openModel={openModel}  />
                <AuthModal />
                <ContentContainer>{props.children}</ContentContainer>
                {user&&token?<Cart show={showCart} closeCart={closeCart} addedProduct={cartItems}/>:null}    
            </Wrapper>
    )
}

export default Layout