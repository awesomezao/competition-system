import React, { ReactElement } from 'react';

import Bottom from '@/components/Bottom';
import Header from '@/components/Header';
import { Iroute } from '@/utils/renderRoutes';

import style from './BasicLayoutUI.module.scss';

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function BasicLayout({route,children}: Props): ReactElement {
  return (
    <div>
      <Header />
      <div className={style.children}>{children}</div>
      <Bottom className={style.bottom}/>
    </div>
  )
}

export default BasicLayout
