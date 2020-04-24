import React, {
  ReactElement,
  useState,
} from 'react';

/**
 * @ Author: zao
 * @ Create Time: 2020-03-18
 * @ Modified by: zao
 * @ Description: 全局头部导航，加入了搜索功能
 */
import {
  Dropdown,
  Menu,
} from 'antd';
import {
  NavLink,
  useHistory,
} from 'react-router-dom';

import Search from '@/components/commons/Search';
import { useAuth } from '@/hooks';
import authContainer from '@/store/auth';

import style from './Header.module.scss';

interface Props {
  className?: string;
}

function Header(props: Props): ReactElement {

  const [showSearch, setShowSearch] = useState(false)
  const history=useHistory()
  const auth = useAuth()
  const authC = authContainer.useContainer()
  const handleQuit = () => {
    authC.setIsLogin(false)
    auth.clearToken()
    history.push('/login')
  }
  const menu: ReactElement = (
    <Menu>
      <Menu.Item key='0' onClick={() => history.push('/center')}>
        个人资料
      </Menu.Item>
      <Menu.Item key='1' onClick={() => history.push('/center/favorite')}>
        我的收藏
      </Menu.Item>
      <Menu.Item key='2' onClick={() => history.push('/center/message')}>
        系统消息
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3' onClick={handleQuit}>
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={props.className}>
      <div className={style.wrapper}>
        <div className={style.container}>
          {/**logo */}
          <a href="/" className={style.logo}
          >''</a>
          {/**nav */}
          <nav className={style.nav}>
            <div className={style.left}>
              <li>
                <NavLink to='/' exact activeClassName={style.active}>首页</NavLink>
              </li>
              <li>
                <NavLink to='/recruit' activeClassName={style.active}>招募人员</NavLink>
              </li>
              {/* <li>
              <NavLink to='/awesome' activeClassName={style.active}>精彩幻灯</NavLink>
            </li> */}
              <li>
                <NavLink to='/related' activeClassName={style.active}>与我相关</NavLink>
              </li>
            </div>

            <div className={style.right}>
              {/**搜索 */}
              <li className={style.search} onClick={() => setShowSearch(!showSearch)}>搜索</li>
              {/**登录/个人中心 */}
              {!authC.isLogin ?
                (<li className={style.login} >
                  <NavLink to='/login' activeClassName={style.active}>登录/注册</NavLink>
                </li>)
                :
                (<li className={style.center}>
                  <Dropdown overlay={menu}>
                    <NavLink to='/center' activeClassName={style.active} >个人中心</NavLink>
                  </Dropdown>
                </li>)}
            </div>
          </nav>
        </div>
      </div>

      <Search showSearch={showSearch} />
    </div >


  )
}

export default Header

