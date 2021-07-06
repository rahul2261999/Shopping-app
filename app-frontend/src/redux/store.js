import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

// import saga
import { rootWatcher } from './saga'

// import reducers
import authReducer from './reducers/user'
import productReducer from './reducers/products'
import toasterReducer from './reducers/toaster'
import categoryReducer from './reducers/category'
import CartOrder from './reducers/cartorder'

const rootReducer = combineReducers({
    user:authReducer,
    category:categoryReducer,
    products:productReducer,
    toaster:toasterReducer,
    cartorder:CartOrder,
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootWatcher)

export default store