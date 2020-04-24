import React, {
  ReactElement,
  useState,
} from 'react';

import { message } from 'antd';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useImmer } from 'use-immer';

import Button from '@/components/commons/Button';
import Avatar from '@/components/forms/Avatar';
import Input from '@/components/forms/Input/Input';
import RadioGroup from '@/components/forms/RadioGroup';
import { useChange } from '@/hooks';
import { signup } from '@/services/apis/user';
import validate from '@/utils/validate';
import { useRequest, useDebounceFn } from '@umijs/hooks';

import style from './Signup.module.scss';

interface Props {

}

function Signup({ }: Props): ReactElement {
  // const [avatar, setAvatar] = useState()
  const [gender, setGender] = useState<'男' | '女'>('男')
  const name = useChange('')
  const pwd = useChange('')
  const confirmPwd = useChange('')
  const mail = useChange('')
  const phone = useChange('')
  const [isValidateRight, setIsValidateRight] = useState(false)
  const [validateMsg, setValidateMsg] = useImmer({
    userName: { msg: '最长不超过7个字符', warn: false, isRight: false },
    pwd: { msg: '密码不少于8位', warn: false, isRight: false },
    confirmPwd: { msg: '密码不少于8位', warn: false, isRight: false },
    mail: { msg: '', warn: false, isRight: false },
    phone: { msg: '', warn: false, isRight: false },
  })
  const location: any = useLocation()
  const history = useHistory()
  const signupR = useRequest(signup, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code >= 0) {
        message.success('注册成功,请前往登录')
        history.push('/login/pwd')
      }
    }
  })
  // 验证表单
  const validateForm = {
    // 检查姓名
    validateName: () => {
      if (validate.required(name.value)) {
        if (validate.checkLength(name.value, 7)) {
          setValidateMsg(draft => {
            draft.userName.msg = '最长不超过7个字符'
            draft.userName.warn = false
            draft.userName.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.userName.msg = '最长不超过7个字符'
            draft.userName.warn = true
            draft.userName.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.userName.msg = '用户名不能为空'
          draft.userName.warn = true
          draft.userName.isRight = false
        })
        return false
      }
    },
    // 检查密码
    validatePwd: () => {
      if (validate.required(pwd.value)) {
        if (!validate.checkLength(pwd.value, 8)) {
          setValidateMsg(draft => {
            draft.pwd.msg = '密码不少于8位'
            draft.pwd.warn = false
            draft.pwd.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.pwd.msg = '密码不少于8位'
            draft.pwd.warn = true
            draft.pwd.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.pwd.msg = '密码不能为空'
          draft.pwd.warn = true
          draft.pwd.isRight = false
        })
        return false
      }
    },
    // 检查确认密码
    validateConfirmPwd: () => {
      if (validate.required(confirmPwd.value)) {
        if (pwd.value === confirmPwd.value) {
          setValidateMsg(draft => {
            draft.confirmPwd.msg = '密码不少于8位'
            draft.confirmPwd.warn = false
            draft.confirmPwd.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.confirmPwd.msg = '确认密码不原密码不相同'
            draft.confirmPwd.warn = true
            draft.confirmPwd.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.confirmPwd.msg = '密码不能为空'
          draft.confirmPwd.warn = true
          draft.confirmPwd.isRight = false
        })
        return false
      }
    },
    // 检查邮箱
    validateMail: () => {
      if (validate.required(mail.value)) {
        if (validate.isEmail(mail.value)) {
          setValidateMsg(draft => {
            draft.mail.msg = ''
            draft.mail.warn = false
            draft.mail.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.mail.msg = '请输入正确的邮箱格式'
            draft.mail.warn = true
            draft.mail.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.mail.msg = '邮箱不能为空'
          draft.mail.warn = true
          draft.mail.isRight = false
        })
        return false
      }
    },
    // 检查电话
    validatePhone: () => {
      if (validate.required(phone.value)) {
        if (validate.isPhoneNumber(phone.value)) {
          setValidateMsg(draft => {
            draft.phone.msg = ''
            draft.phone.warn = false
            draft.phone.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.phone.msg = '请输入正确的电话格式'
            draft.phone.warn = true
            draft.phone.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.phone.msg = '电话不能为空'
          draft.phone.warn = true
          draft.phone.isRight = false
        })
        return false
      }
    }
  }

  const validateName = useDebounceFn(validateForm.validateName, 300)
  const validatePwd = useDebounceFn(validateForm.validatePwd, 300)
  const validateConfirmPwd = useDebounceFn(validateForm.validateConfirmPwd, 300)
  const validateMail = useDebounceFn(validateForm.validateMail, 300)
  const validatePhone = useDebounceFn(validateForm.validatePhone, 300)
  const checkValidate = useDebounceFn(() => {
    if (validateMsg.userName.isRight && validateMsg.pwd.isRight && validateMsg.confirmPwd.isRight && validateMsg.mail.isRight && validateMsg.phone.isRight) {
      setIsValidateRight(true)
    } else {
      setIsValidateRight(false)
    }
  }, 300)
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    signupR.run({
      username: name.value,
      gender: gender,
      emailaddr: mail.value,
      phone: phone.value,
      password: pwd.value
    }, location.state.verificationCode)
  }
  return (
    <form className={style.form} onSubmit={handleSubmit} onInput={checkValidate.run}>
      {/* <Avatar msg='上传头像' bind={setAvatar} /> */}
      <Input type='text' onInput={validateName.run} bind={name} name='用户名' msg={validateMsg.userName.msg} warn={validateMsg.userName.warn} />
      <RadioGroup name='性别' radioList={['男', '女']} bind={setGender} />
      <Input type='password' onInput={validatePwd.run} bind={pwd} name='密码' msg={validateMsg.pwd.msg} warn={validateMsg.pwd.warn} />
      <Input type='password' onInput={validateConfirmPwd.run} bind={confirmPwd} name='确认密码' msg={validateMsg.confirmPwd.msg} warn={validateMsg.confirmPwd.warn} />
      <Input type='text' onInput={validateMail.run} bind={mail} name='邮箱' msg={validateMsg.mail.msg} warn={validateMsg.mail.warn} />
      <Input type='text' onInput={validatePhone.run} bind={phone} name='电话' msg={validateMsg.phone.msg} warn={validateMsg.phone.warn} />
      <Button value='保存' disabled={!isValidateRight} type='submit' className={style.btn} loading={signupR.loading} />
    </form>
  )
}

export default Signup
