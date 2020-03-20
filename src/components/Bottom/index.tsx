import React, { ReactElement } from 'react'

import style from './BottomUI.module.scss'

interface Props {
  className?: string;
}

function Bottom({className}: Props): ReactElement {
  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={style.container}>@移动互联网应用工程研究中心</div>
    </div>
  )
}

export default Bottom
