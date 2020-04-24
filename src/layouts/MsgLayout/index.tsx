import React, { ReactElement, useState } from 'react';

import { Spin } from 'antd'
import SystemMsg from '@/components/commons/SystemMsg';
import { Iroute } from '@/utils/renderRoutes';
import style from './MsgLayout.module.scss';
import systemMsgContainer from '@/store/systemMsg'

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function MsgLayout({ children }: Props): ReactElement {
  const systemMsg = systemMsgContainer.useContainer()

  return (
    <div className={style.container}>
      <div className={style.left}>{children}</div>
      <div className={style.right}>
        <Spin spinning={systemMsg.loading} >
        <SystemMsg name='热门会议' msgList={systemMsg.msgList} />
      </Spin>
      </div>
      

    </div>

  )
}

export default MsgLayout
