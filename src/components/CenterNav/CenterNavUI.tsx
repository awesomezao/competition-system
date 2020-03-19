import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {

}

function CenterNavUI({ }: Props): ReactElement {
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

export default CenterNavUI
