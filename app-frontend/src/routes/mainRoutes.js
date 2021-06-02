import {Switch, Redirect} from 'react-router-dom'
import Routes  from '../hoc/CanAccess'

import Home from '../components/Home/Home'
import TShirt from '../components/T-Shirt/TShirt'
import Shoes from '../components/Shoes/Shoes'
import Dashboard from '../components/Dashboard/Dashboard'

const mainRoutes = props =>{
    return(
            <Switch>
                <Routes path="/" exact component={Home} />
                <Routes path="/tshirt" component={TShirt} />
                <Routes path="/shoes" component={Shoes} />
                <Routes path="/dashboard" exact adminRoute component={Dashboard} />
                <Routes path="/dashboard/addproduct" adminRoute component={Dashboard} />
                <Routes path="/dashboard/addcategory" adminRoute component={Dashboard} />
                <Routes path="/dashboard/allusers" adminRoute component={Dashboard} />
                <Routes path="/dashboard/orders" adminRoute component={Dashboard} />
                <Routes path="/dashboard/profile" adminRoute component={Dashboard} />
                <Redirect path="/*" to="/" />
            </Switch>
    )
}

export default mainRoutes