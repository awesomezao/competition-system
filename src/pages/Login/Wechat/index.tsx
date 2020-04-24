import React, { ReactElement } from 'react';

import style from './Wechat.module.scss';

interface Props {
  className?: string;
}

function Wechat(props: Props): ReactElement {
  return (
    <div className={`${style.container} ${props.className}`}>
      微信登录
    </div>
  )
}

export default Wechat
