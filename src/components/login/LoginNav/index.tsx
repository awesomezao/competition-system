/**
 * @ Author: zao
 * @ Create Time: 2020-03-18
 * @ Modified by: zao
 * @ Description: 登陆注册的导航
 */

import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import style from './LoginNav.module.scss';

interface Props {
  className?: string;
}

function LoginNav({ className }: Props): ReactElement {
  return (
    <nav className={`${className} ${style.container}`}>
      <li>
        <NavLink to='/login' exact activeClassName={style.active}>短信登陆/注册</NavLink>
      </li>
      <li>
        <NavLink to='/login/pwd' activeClassName={style.active}>密码登录</NavLink>
      </li>
    </nav>
  )
}

export default LoginNav
