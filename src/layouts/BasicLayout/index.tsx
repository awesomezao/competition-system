import React, { ReactElement } from 'react'

import Header from '@/components/Header'
import { Iroute } from '@/utils/renderRoutes'

import style from './BasicLayoutUI.module.scss'

interface Props {
  route: Iroute;
  children: ReactElement;
}

function BasicLayout({route,children}: Props): ReactElement {
  return (
    <div>
      <Header/>
      <div className={style.container}>{children}</div>
    </div>
  )
}

export default BasicLayout
