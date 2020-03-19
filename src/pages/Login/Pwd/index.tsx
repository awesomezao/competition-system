import React, { ReactElement } from 'react'

import Input from '@/components/LoginInput'
import Button from '@/components/LoginButton'

import style from './PwdUI.module.scss'

interface Props {
  
}

function Pwd({}: Props): ReactElement {
  return (
    <form className={style.form}>
      <Input type='text' placeholder='手机号/邮箱' msg={'手机号尽量与微信保持一致'} />
      <Input type='password' placeholder='密码' msg={'密码不少于8位'} isOnEye={true}/>
      <Button className={style.btn}/>
    </form>
  )
}

export default Pwd
