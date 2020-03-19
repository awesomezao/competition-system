import React, { ReactElement, useState } from 'react'

import Input from '@/components/LoginInput'
import Button from '@/components/LoginButton'
import { useCountDown, useOnUpdate } from '@/hooks'

import style from './MsgUI.module.scss'

interface Props {

}

function Msg({ }: Props): ReactElement {
  const [count, start, verificationStatus] = useCountDown(5)
  const [verificationValue, setVerificationValue] = useState('获取验证码')

  useOnUpdate(() => {
    if (verificationStatus === true) {
      setVerificationValue(`重新发送验证码(${count})`)
    } else {
      setVerificationValue('获取验证码')
    }
  }, [count])

  const getVerificationCode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    start()
  }
  return (
    <form className={style.form}>
      <Input
        type='text'
        placeholder='手机号/邮箱'
        msg={'手机号尽量与微信号保持一致'}
      />
      <Input
        type='text'
        placeholder='请输入验证码'
        hasBtn={true}
        btnValue={verificationValue}
        btnStatus={verificationStatus}
        btnCallback={getVerificationCode}
        msg={''}
      />
      <Button className={style.btn} />
    </form>
  )
}

export default Msg
