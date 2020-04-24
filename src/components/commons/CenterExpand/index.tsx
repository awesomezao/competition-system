import React, { ReactElement } from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import  {useAuth} from '@/hooks'
import authContainer from '@/store/auth'
interface Props {

}

function CenterExpand({ }: Props): ReactElement {
  const history = useHistory()
  const authC=authContainer.useContainer()
  const auth=useAuth()
  const handleQuit = () => {
    authC.setIsLogin(false)
    auth.clearToken()
    history.push('/login')
  }
  return (
    <Menu>
      <Menu.Item key='0' onClick={()=>history.push('/center')}>
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
}

export default CenterExpand
