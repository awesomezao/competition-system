import React, { ReactElement } from 'react';

import Bottom from '@/components/commons/Bottom';
import Header from '@/components/commons/Header';
import { Iroute } from '@/utils/renderRoutes';

import style from './BasicLayout.module.scss';

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function BasicLayout({ route, children }: Props): ReactElement {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.children}>{children}</div>
      <Bottom className={style.bottom} />
    </div>
  )
}

export default BasicLayout
