/**
 * @ Author: zao
 * @ Create Time: 2020-03-18
 * @ Modified by: zao
 * @ Description: 个人中心的导航菜单
 * TODO: 记得添加样式
 */

import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import style from './CenterBar.module.scss'

interface Props {
  className?: string;
}

function CenterNav({ className }: Props): ReactElement {
  return (
    <nav className={`${className} ${style.container}`}>
      <li>
        <NavLink to='/center' exact activeClassName={style.active}>个人资料</NavLink>
      </li>
      <li>
        <NavLink to='/center/favorite' activeClassName={style.active}>我的收藏</NavLink>
      </li>
      <li>
        <NavLink to='/center/message' activeClassName={style.active}>系统消息</NavLink>
      </li>
    </nav >
  )
}

export default CenterNav