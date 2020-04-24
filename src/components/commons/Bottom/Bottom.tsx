/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 页面底部，可添加版权信息
 */

import React, { ReactElement } from 'react';

import style from './Bottom.module.scss';

interface Props {
  className?: string;
}

function Bottom({ className }: Props): ReactElement {
  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={style.container}>@移动互联网应用工程研究中心</div>
    </div>
  )
}

export default Bottom
