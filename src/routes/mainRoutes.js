import {Switch,Route, Redirect} from 'react-router-dom'
import Home from '../components/Home/Home'
const mainRoutes = props =>{
    return(
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tshirt" exact component={Home} />
                <Route path="/shoes" exact component={Home} />
                <Redirect to="/" />
            </Switch>
    )
}

export default mainRoutes