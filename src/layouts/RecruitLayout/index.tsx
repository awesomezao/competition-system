import React, { ReactElement } from 'react'

import SystemMsg from '@/components/SystemMsg'
import { Iroute } from '@/utils/renderRoutes'
import style from './RecruitLayoutUI.module.scss'

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function RecruitLayout({children}: Props): ReactElement {
  return (
    <div className={style.container}>
      <div className={style.left}>{children}</div>
      <div className={style.right}>
        <SystemMsg name='热门会议' msgList={[]}/>
      </div>
    </div>
  )
}

export default RecruitLayout
