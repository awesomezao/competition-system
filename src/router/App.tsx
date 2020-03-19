import React, {  Suspense, ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import renderRoutes from '@/utils/renderRoutes'
import routesConfig from './config'
import LoadingPage from '@/components/LoadingPage'

import '@/styles/global.scss'

interface Props {

}

function App({ }: Props): ReactElement {

  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        {renderRoutes(routesConfig)}
      </Suspense>
    </Router>

  )
}

export default App
