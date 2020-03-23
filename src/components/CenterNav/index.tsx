/**
 * @ Author: zao
 * @ Create Time: 2020-03-18
 * @ Modified by: zao
 * @ Description: 个人中心的导航菜单
 * TODO: 记得添加样式
 */

import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

interface Props {

}

function CenterNav({ }: Props): ReactElement {
  return (
    <nav>
      <li>
        <NavLink to='/center'>个人资料</NavLink>
      </li>
      <li>
        <NavLink to='/center/favorite'>我的收藏</NavLink>
      </li>
      <li>
        <NavLink to='/center/message'>系统消息</NavLink>
      </li>
    </nav>
  )
}

export default CenterNav