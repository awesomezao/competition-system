import React, { ReactElement } from 'react';

import LoginNav from '@/components/login/LoginBar';
import Wechat from '@/pages/Login/Wechat';
import { Iroute } from '@/utils/renderRoutes';

import style from './LoginLayout.module.scss';

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function BasicLayout({ route, children }: Props): ReactElement {
  return (
    <div className={style.container}>
      {/**背景 */}
      <div className={style.left}>
      </div>
      {/**主体 */}
      <div className={style.right}>
        <LoginNav />
        <div className={style.form}>{children}</div>
        <span className={style.other}>第三方登录</span>
        <Wechat className={style.wechat} />
      </div>

    </div>
  )
}

export default BasicLayout
