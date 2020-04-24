import React, {
  ReactElement,
  useState,
} from 'react';

import {
  message,
  Modal,
  Spin,
} from 'antd';
import { useHistory } from 'react-router-dom';

import Button from '@/components/commons/Button';
import Avatar from '@/components/forms/Avatar';
import Input from '@/components/forms/Input';
import RadioGroup from '@/components/forms/RadioGroup';
import {
  useAuth,
  useChange,
  useCountDown,
  useOnMount,
  useOnUpdate,
} from '@/hooks';
import {
  getUserInfo,
  getVerificationCode,
  updatePwd,
  updateUser,
  uploadUserIcon,
} from '@/services/apis/user';
import authContainer from '@/store/auth';
import { useRequest, useDebounceFn } from '@umijs/hooks';
import { verificationWaitTime } from '@/constant'
import style from './Info.module.scss';
import { useImmer } from 'use-immer'
import validate from '@/utils/validate'

interface Props {

}

function Info(props: Props): ReactElement {
  const [count, start, verificationStatus] = useCountDown(verificationWaitTime)
  const [loadStatus, setLoadStatus] = useState(false)
  const [avatar, setAvatar] = useState<any>('')
  const [gender, setGender] = useState<'男' | '女'>('男')
  const [showModal, setShowModal] = useState(false)
  const [verificationValue, setVerificationValue] = useState('获取验证码')
  const name = useChange('')
  const mail = useChange('')
  const phone = useChange('')
  const changePwd = useChange('')
  const changeMailOrPhone = useChange('')
  const changeVerificationCode = useChange('')
  const [isValidateRight, setIsValidateRight] = useState(false)
  // const [changeMsg, setChangeMsg] = useState('')
  const auth = useAuth()
  const history = useHistory()
  const authC = authContainer.useContainer()

  const [validateMsg, setValidateMsg] = useImmer({
    key: { msg: '手机号尽量与微信号保持一致', warn: false, isRight: false },
    pwd: { msg: '密码不少于8位', warn: false, isRight: false },
    verification: { msg: '', warn: false, isRight: false },
  })

  const userInfoR = useRequest(getUserInfo, {
    onSuccess: (result, param) => {
      if (result.data) {
        setAvatar(`http://www.ljhhhx.com:8080/meeting-v2/userIcon/${result.data.info.avatar}`)
        setGender(result.data.info.gender)
        name.setValue(result.data.info.username)
        mail.setValue(result.data.info.emailaddr)
        phone.setValue(result.data.info.phone)
      }
    }
  })
  const updateUserR = useRequest((userJson) => updateUser(userJson), { manual: true })
  const updateUserAvatarR = useRequest((formData) => uploadUserIcon(formData), { manual: true })
  const updatePwdR = useRequest((mailAddr_or_Phone, password, verificationCode) => updatePwd(mailAddr_or_Phone, password, verificationCode), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.code >= 0) {
        message.success('修改成功,请重新登录')
        auth.clearToken()
        setShowModal(false)
        authC.setIsLogin(false)
        history.push('/login')
      }
    }
  })
  const getVerificationCodeR = useRequest((mailAddr_or_Phone) => getVerificationCode(mailAddr_or_Phone), { manual: true })

  const handleModalOk = () => {
    updatePwdR.run(changeMailOrPhone.value, changePwd.value, changeVerificationCode.value)
  }
  const handleModalCancel = () => {
    setShowModal(false)
  }

  const handleGetVerificationCode = (e: React.SyntheticEvent) => {
    e.preventDefault()
    start()
    if (validateForm.validatePhoneOrMail()) {
      start()
      getVerificationCodeR.run(changeMailOrPhone.value)
    }
  }

  const validateForm = {
    validatePhoneOrMail: () => {
      if (validate.required(changeMailOrPhone.value)) {
        // 验证正确格式
        if (validate.isPhoneNumber(changeMailOrPhone.value) || validate.isEmail(changeMailOrPhone.value)) {
          setValidateMsg(draft => {
            draft.key.msg = '手机号尽量与微信号保持一致'
            draft.key.warn = false
            draft.key.isRight = true
          })
          return true
        } else {
          setValidateMsg(draft => {
            draft.key.msg = '请输入正确的电话号码或邮箱'
            draft.key.warn = true
            draft.key.isRight = false
          })
          return false
        }
      } else {
        setValidateMsg(draft => {
          draft.key.msg = '邮箱或者电话不能为空'
          draft.key.warn = true
          draft.key.isRight = false
        })
        return false
      }
    },
    validateVerification: () => {
      // 验证验证码是否为空
      if (validate.required(changeVerificationCode.value)) {
        setValidateMsg(draft => {
          draft.verification.msg = ''
          draft.verification.warn = false
          draft.verification.isRight = true
        })
        return true
      } else {
        setValidateMsg(draft => {
          draft.verification.msg = '验证码不能为空'
          draft.verification.warn = true
          draft.verification.isRight = false
        })
        return false
      }
    },
    // 检查密码
    validatePwd: () => {
      if (validate.required(changePwd.value)) {
        if (!validate.checkLength(changePwd.value, 8)) {
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
  }
  const validateKey = useDebounceFn(validateForm.validatePhoneOrMail, 300)
  const validatePwd = useDebounceFn(validateForm.validatePwd, 300)
  const validateVerification = useDebounceFn(validateForm.validateVerification, 300)
  const checkValidate = useDebounceFn(() => {
    if (validateMsg.key.isRight && validateMsg.pwd.isRight && validateMsg.verification.isRight) {
      setIsValidateRight(true)
    } else {
      setIsValidateRight(false)
    }
  }, 300)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    let avatarFormdata = new FormData()
    avatarFormdata.set('img', avatar)
    avatarFormdata.set('phone', phone.value)
    updateUserR.run({ gender, username: name.value, emailaddr: mail.value, phone: phone.value })
    if (typeof avatarFormdata.get('img') !== 'string') updateUserAvatarR.run(avatarFormdata)
    userInfoR.run()
  }
  useOnUpdate(() => {
    if (verificationStatus === true) {
      setVerificationValue(`重新发送验证码(${count})`)
    } else {
      setVerificationValue('获取验证码')
    }
  }, [count])

  return (
    <Spin spinning={loadStatus}>
      <form className={style.container} onSubmit={handleSubmit}>
        <Avatar msg='修改头像' bind={setAvatar} initialData={avatar} />
        <Input type='text' bind={name} name='用户名' msg='最长超过7个字符' readOnly update={true} />
        <RadioGroup name='性别' radioList={['男', '女']} bind={setGender} initialData={gender} />
        <Input type='text' bind={mail} name='邮箱' msg='修改需要源邮箱认证' readOnly update={true} />
        <Input type='text' bind={phone} name='电话' msg='修改需要源手机认证' readOnly update={true} />
        <div className={style.pwd}>
          <h2 onClick={() => setShowModal(true)}>修改密码</h2>
          <span>修改密码需要手机或者邮箱验证</span>
        </div>
        <Modal
          title="修改密码"
          visible={showModal}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          confirmLoading={updatePwdR.loading}
          okButtonProps={{ disabled: !isValidateRight}}
        >
          <form className={style.fix} onInput={checkValidate.run}>
            <Input type='text' onInput={validateKey.run} bind={changeMailOrPhone} name='手机/邮箱' msg={validateMsg.key.msg} warn={validateMsg.key.warn} />
            <Input type='password' onInput={validatePwd.run} bind={changePwd} name='新密码' msg={validateMsg.pwd.msg} warn={validateMsg.pwd.warn} />
            <Input type='text' onInput={validateVerification.run} bind={changeVerificationCode} name='验证码' hasBtn btnValue={verificationValue} btnStatus={verificationStatus} btnCallback={handleGetVerificationCode} msg={validateMsg.verification.msg} warn={validateMsg.verification.warn} />
          </form>

        </Modal>
        <Button type='submit' className={style.btn} value='保存' loading={updateUserR.loading}/>
      </form>
    </Spin>

  )
}

export default Info
