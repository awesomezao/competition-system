import React, { ReactElement, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Button from '@/components/login/LoginButton';
import Input from '@/components/login/LoginInput';
import {
  useChange,
  useStorage,
  useOnUpdate
} from '@/hooks';
import { login } from '@/services/apis/user';
import authContainer from '@/store/auth';
import validate from '@/utils/validate';
import { useRequest, useDebounce, useDebounceFn } from '@umijs/hooks';

import style from './Pwd.module.scss';

interface Props {

}

function Pwd({ }: Props): ReactElement {
  const auth = authContainer.useContainer()
  const key = useChange('')
  const pwd = useChange('')
  const [isValidateRight, setIsValidateRight] = useState(false)
  const history = useHistory()
  const [token, setToken, clearToken] = useStorage('user_token')
  const [validateMsg, setValidateMsg] = useImmer({
    mailOrPhone: { msg: '手机号尽量与微信号保持一致', warn: false, isRight: false },
    pwd: { msg: '', warn: false, isRight: false },
  })

  const loginR = useRequest(login, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code < 0) {
        setValidateMsg(draft => {
          draft.pwd.msg = result.message
          draft.pwd.warn = true
        })
      } else {
        setValidateMsg(draft => {
          draft.pwd.msg = ''
          draft.pwd.warn = false
        })
        if (result.data) {
          setToken(result.data.jwt)
          auth.setIsLogin(true)
          history.push('/center')
        }
      }

    }
  })
  const validateForm = {
    validatePhoneOrMail: () => {
      if (validate.required(key.value)) {
        // 验证正确格式
        if (validate.isPhoneNumber(key.value) || validate.isEmail(key.value)) {
          setValidateMsg(draft => {
            draft.mailOrPhone.msg = '手机号尽量与微信号保持一致'
            draft.mailOrPhone.warn = false
            draft.mailOrPhone.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.mailOrPhone.msg = '请输入正确的电话号码或邮箱'
            draft.mailOrPhone.warn = true
            draft.mailOrPhone.isRight = false
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
    validatePwd: () => {
      // 验证密码是否为空
      if (validate.required(pwd.value)) {
        setValidateMsg(draft => {
          draft.pwd.msg = ''
          draft.pwd.warn = false
          draft.pwd.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.pwd.msg = '密码不能为空'
          draft.pwd.warn = true
          draft.pwd.isRight = false
        })
        return false
      }
    }
  }
  const validateKey = useDebounceFn(validateForm.validatePhoneOrMail, 300)
  const validatePwd = useDebounceFn(validateForm.validatePwd, 300)
  const checkValidate = useDebounceFn(() => {
    if (validateMsg.mailOrPhone.isRight && validateMsg.pwd.isRight) {
      setIsValidateRight(true)
    } else {
      setIsValidateRight(false)
    }
  }, 300)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    loginR.run(key.value, pwd.value)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit} onInput={checkValidate.run}>
      <Input type='text' onInput={validateKey.run} bind={key} placeholder='手机号/邮箱' msg={validateMsg.mailOrPhone.msg} warn={validateMsg.mailOrPhone.warn} />
      <Input type='password' onInput={validatePwd.run} bind={pwd} placeholder='密码' msg={validateMsg.pwd.msg} warn={validateMsg.pwd.warn} isOnEye={true} />
      <Button className={style.btn} disabled={!isValidateRight} loading={loginR.loading} />
    </form>
  )
}

export default Pwd
