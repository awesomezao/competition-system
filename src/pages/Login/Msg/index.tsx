import React, {
  ReactElement,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom'

import Button from '@/components/login/LoginButton';
import Input from '@/components/login/LoginInput';
import {
  useCountDown,
  useOnUpdate,
  useChange
} from '@/hooks';
import { useRequest,useDebounceFn } from '@umijs/hooks'
import { getVerificationCode } from '@/services/apis/user'
import validate from '@/utils/validate'
import { useImmer } from 'use-immer'
import {verificationWaitTime} from '@/constant'


import style from './Msg.module.scss';

interface Props {

}

function Msg({ }: Props): ReactElement {

  const [count, start, verificationStatus] = useCountDown(verificationWaitTime)
  const [verificationValue, setVerificationValue] = useState('获取验证码')
  const key = useChange('')
  const verification = useChange('')
  const [isValidateRight, setIsValidateRight] = useState(false)
  const [validateMsg, setValidateMsg] = useImmer({
    mailOrPhone: { msg: '手机号尽量与微信号保持一致', warn: false,isRight:false },
    verification: { msg: '', warn: false,isRight:false },
  })
  const history = useHistory()
  const getVerificationCodeR = useRequest(getVerificationCode, {
    manual: true,
  })
  useOnUpdate(() => {
    if (verificationStatus === true) {
      setVerificationValue(`重新发送验证码(${count})`)
    } else {
      setVerificationValue('获取验证码')
    }
  }, [count])

  //获取验证码
  const handleGetVerificationCode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (validateForm.validatePhoneOrMail()) {
      start()
      getVerificationCodeR.run(key.value)
    }
  }

  const validateForm = {
    validatePhoneOrMail: () => {
      if (validate.required(key.value)) {
        // 验证正确格式
        if (validate.isPhoneNumber(key.value) || validate.isEmail(key.value)) {
          setValidateMsg(draft => {
            draft.mailOrPhone.msg = '手机号尽量与微信号保持一致'
            draft.mailOrPhone.warn = false
            draft.mailOrPhone.isRight=true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.mailOrPhone.msg = '请输入正确的电话号码或邮箱'
            draft.mailOrPhone.warn = true
            draft.mailOrPhone.isRight=false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.mailOrPhone.msg = '邮箱或者电话不能为空'
          draft.mailOrPhone.warn = true
          draft.mailOrPhone.isRight = false
        })
        return false
      }
    },
    validateVerification: () => {
      // 验证验证码是否为空
      if (validate.required(verification.value)) {
        setValidateMsg(draft => {
          draft.verification.msg = ''
          draft.verification.warn = false
          draft.verification.isRight=true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.verification.msg = '验证码不能为空'
          draft.verification.warn = true
          draft.verification.isRight =false
        })
        return false
      }
    }
  }
  const validateKey = useDebounceFn(validateForm.validatePhoneOrMail, 300)
  const validateVerification = useDebounceFn(validateForm.validateVerification, 300)
  const checkValidate = useDebounceFn(() => {
    if (validateMsg.mailOrPhone.isRight && validateMsg.verification.isRight) {
      setIsValidateRight(true)
    } else {
      setIsValidateRight(false)
    }
  },300)
  // 登录/注册
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    history.push('/signup', { verificationCode: verification.value })
  }
  return (
    <form className={style.form} onSubmit={handleSubmit} onInput={checkValidate.run}>
      <Input
        type='text'
        placeholder='手机号/邮箱'
        msg={validateMsg.mailOrPhone.msg}
        warn={validateMsg.mailOrPhone.warn}
        bind={key}
        onInput={validateKey.run}
      />
      <Input
        type='text'
        placeholder='请输入验证码'
        hasBtn={true}
        btnValue={verificationValue}
        btnStatus={verificationStatus}
        btnCallback={handleGetVerificationCode}
        msg={validateMsg.verification.msg}
        warn={validateMsg.verification.warn}
        bind={verification}
        onInput={validateVerification.run}
      />
      <Button className={style.btn} disabled={!isValidateRight}/>
    </form>
  )
}

export default Msg
