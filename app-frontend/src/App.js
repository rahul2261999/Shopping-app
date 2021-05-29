import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import {Provider} from 'react-redux'

import Layout from './components/Layout/Layout'
import MainRoutes from './routes/mainRoutes'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <MainRoutes />
          </Layout>
        </BrowserRouter>
    </Provider>
  )
}

export default App;
