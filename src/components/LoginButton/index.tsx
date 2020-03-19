import React, { ReactElement } from 'react'

import style from './LoginButtonUI.module.scss'

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
