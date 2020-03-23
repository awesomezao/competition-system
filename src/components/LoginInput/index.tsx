/**
 * @ Author: zao
 * @ Create Time: 2020-03-19
 * @ Modified by: zao
 * @ Description: 登陆input组件
 */

import React, { ReactElement, useState } from 'react'

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import style from './InputUI.module.scss'

interface Props {
  type: 'text' | 'password';
  placeholder: string;
  msg: string;
  warn?: boolean;
  bind?: any;
  hasBtn?: boolean;
  btnValue?: string;
  btnStatus?: boolean;
  btnCallback?: (e: React.SyntheticEvent) => any;
  isOnEye?: boolean;
  className?: string;
}

function Input(props: Props): ReactElement {
  const { type, placeholder, bind = {}, isOnEye = false, hasBtn = false, btnValue = '', btnCallback, btnStatus = false, msg, warn = false } = props
  const [snapHolderValue, setSnapHolderValue] = useState(placeholder)
  const [isFocus, setIsFocus] = useState(false)
  const [snapIsOnEye] = useState(isOnEye)
  const [isShowPwd, setIsShowPwd] = useState(false)

  const handleFocus = () => {
    setIsFocus(true)
    setSnapHolderValue('')
  }
  const handleBlur = () => {
    setIsFocus(false)
    setSnapHolderValue(placeholder)
  }
  const toggleShowPwd = () => {
    setIsShowPwd(!isShowPwd)
  }
  return (
    <div className={`${style.container} ${props.className}`}>
      <span className={isFocus ? style.focus : style.title}>{placeholder}</span>
      <input
        {...bind.bindEvent}
        className={style.input}
        type={!snapIsOnEye ?
          type
          :
          isShowPwd ?
            'text' : 'password'
        }
        placeholder={snapHolderValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isOnEye ?
        isShowPwd ?
          <EyeOutlined className={style.eye} onClick={toggleShowPwd} />
          :
          <EyeInvisibleOutlined className={style.eye} onClick={toggleShowPwd} />
        :
        null}
      {hasBtn ? (<button
        className={btnStatus ? style.disabled : style.btn}
        disabled={btnStatus}
        onClick={btnCallback}>{btnValue}</button>) : null}
      <span className={warn ? style.warn : style.msg}>{msg}</span>
    </div>
  )
}

export default Input
