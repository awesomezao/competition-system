import React, { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Search from '@/components/Search'
import style from './HeaderUI.module.scss'
interface Props {
  className?: string;
}

function Header({ className}: Props): ReactElement {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className={className}>
      <div className={style.wrapper}>
        <div className={style.container}>
          {/**logo */}
          <a href="/" className={style.logo}
          >''</a>
          {/**nav */}
          <nav className={style.nav}>
            <li>
              <NavLink to='/' exact activeClassName={style.active}>首页</NavLink>
            </li>
            <li>
              <NavLink to='/recruit' activeClassName={style.active}>招募人员</NavLink>
            </li>
            <li>
              <NavLink to='/awesome' activeClassName={style.active}>精彩幻灯</NavLink>
            </li>
            <li>
              <NavLink to='/related' activeClassName={style.active}>与我相关</NavLink>
            </li>
            {/**搜索 */}
            <li className={style.search} onClick={()=>setShowSearch(!showSearch)}>搜索</li>
            {/**登录/个人中心 */}
            <li className={style.login} >
              <NavLink to='/login' activeClassName={style.active}>登录/注册</NavLink>
            </li>
            {/* <li>
            <NavLink to='/center' activeClassName={style.active}>个人中心</NavLink>
          </li> */}
          </nav>
        </div>
      </div>

      <Search showSearch={showSearch}/>
    </div>
    
    
  )
}

export default Header

