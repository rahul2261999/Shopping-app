import {createStore,combineReducers,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

// import saga
import { rootWatcher } from './saga'

// import reducers
import authReducer from './reducers/user'

const rootReducer = combineReducers({
    user:authReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)

export default store