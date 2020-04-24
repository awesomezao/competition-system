import '@/styles/global.scss';

import React, { ReactElement } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import RenderRoutes from '@/components/commons/RenderRoutes';
import {
  useAuth,
  useOnMount,
  useOnUpdate
} from '@/hooks';
import authContainer from '@/store/auth';
// import { isUndefined } from '@/utils';
import {isUndefined} from 'lodash'
import systemMsgContainer from '@/store/systemMsg'
import routesConfig from './config';

interface Props {

}


function App({ }: Props): ReactElement {
  const auth = authContainer.useContainer()
  const systemMsg=systemMsgContainer.useContainer()
  const token = useAuth()
  useOnMount(() => {
    if (!isUndefined(token.token) && token.token !== '') {
      auth.setIsLogin(true) 
    }
  })
  useOnUpdate(() => {
    if (auth.isLogin) {
      systemMsg.run()
    }
  },[auth.isLogin])
  return (
    <Router>
      <RenderRoutes routes={routesConfig} isLogin={auth.isLogin}/>
    </Router>
  )
}

export default App
