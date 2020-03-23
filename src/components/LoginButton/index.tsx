/**
 * @ Author: zao
 * @ Create Time: 2020-03-19
 * @ Modified by: zao
 * @ Description: 登陆/注册按钮
 */

import React, { ReactElement } from 'react';

import style from './LoginButtonUI.module.scss';

interface Props {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function LoginButton(props: Props): ReactElement {
  return (
    <button className={`${style.container} ${props.className}`} type='submit'>注册/登录</button>
  )
}

export default LoginButton
