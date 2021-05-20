import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import Layout from './components/Layout/Layout'
import MainRoutes from './routes/mainRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <MainRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App;
