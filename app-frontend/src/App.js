import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import {Provider} from 'react-redux'

import MainRoutes from './routes/mainRoutes'
import store from './redux/store'
import Toaster from './utilities/Toaster/Toaster'

const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <MainRoutes />
            <Toaster/>
        </BrowserRouter>
    </Provider>
  )
}

export default App;
