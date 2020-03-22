import React, { ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import renderRoutes from '@/utils/renderRoutes'
import routesConfig from './config'
// import LoadingPage from '@/components/LoadingPage'

import '@/styles/global.scss'

interface Props {

}

function App({ }: Props): ReactElement {

  return (
    <Router>
      {renderRoutes(routesConfig)}
    </Router>

  )
}

export default App
