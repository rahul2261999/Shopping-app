import {Switch,Route, Redirect} from 'react-router-dom'

import Home from '../components/Home/Home'
import TShirt from '../components/T-Shirt/TShirt'
import Shoes from '../components/Shoes/Shoes'

const mainRoutes = props =>{
    return(
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tshirt" component={TShirt} />
                <Route path="/shoes" component={Shoes} />
                <Redirect to="/" />
            </Switch>
    )
}

export default mainRoutes