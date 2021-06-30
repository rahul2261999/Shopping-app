import {Switch, Redirect} from 'react-router-dom'
import Routes  from '../hoc/CanAccess'

import Home from '../components/Home/Home'
import TShirt from '../components/T-Shirt/TShirt'
import Shoes from '../components/Shoes/Shoes'
import Dashboard from '../components/Dashboard/Dashboard'
import Product from '../components/Dashboard/Product/Product'
import Category from '../components/Dashboard/Category/Category'
import Checkout from '../components/Checkout/Checkout'
import Users from '../components/Dashboard/Users/User'
import Orders from '../components/Dashboard/Orders/Orders'

const mainRoutes = props =>{
    return(
            <Switch>
                <Routes path="/" exact component={Home} />
                <Routes path="/tshirt" component={TShirt} />
                <Routes path="/shoes" component={Shoes} />
                <Routes path="/checkout/orderinformation" isLoggedIn component={Checkout} />
                <Routes path="/dashboard" exact adminRoute component={Product} />
                <Routes path="/dashboard/addcategory" adminRoute component={Category} />
                <Routes path="/dashboard/allusers" adminRoute component={Users} />
                <Routes path="/dashboard/orders" adminRoute component={Orders} />
                <Routes path="/dashboard/profile" adminRoute component={Dashboard} />
                <Redirect path="/*" to="/" />
            </Switch>
    )
}

export default mainRoutes