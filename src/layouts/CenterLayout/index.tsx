import React, { ReactElement } from 'react';

import CenterBar from '@/components/bars/CenterBar';
import { Iroute } from '@/utils/renderRoutes';
import style from './CenterLayout.module.scss'

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function CenterLayout({ route, children }: Props): ReactElement {
  return (
    <div className={style.container}>
      <CenterBar className={style.left}/>
      <div className={style.right}>{children}</div>
    </div>
  )
}

export default CenterLayout
