import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

import style from './LoginNavUI.module.scss'

interface Props {

}

function LoginNavUI({ }: Props): ReactElement {
  return (
    <nav className={style.container}>
      <li>
        <NavLink to='/login' exact activeClassName={style.active}>短信登陆/注册</NavLink>
      </li>
      <li>
        <NavLink to='/login/pwd' activeClassName={style.active}>密码登录</NavLink>
      </li>
    </nav>
  )
}

export default LoginNavUI
