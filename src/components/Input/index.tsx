/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局input，仅包含text和password，配合useOnChange使用
 */

import React, { ReactElement, useState } from 'react'

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import style from './InputUI.module.scss'

interface Props {
  type: 'text' | 'password';
  name: string; // input框前面的文字
  placeholder?: string;
  msg?: string;  // input下方的提示语
  warn?: boolean; // input msg的警告
  bind?: any; // 双向绑定input事件
  className?: string;
  readOnly?: boolean;
}

function Input(props: Props): ReactElement {
  const { type, name, placeholder = '点击编辑内容', bind = {}, msg, warn = false, readOnly = false } = props
  const [isShowPwd, setIsShowPwd] = useState(false)

  const toggleShowPwd = () => {
    setIsShowPwd(!isShowPwd)
  }
  return (
    <div className={`${style.container} ${props.className}`}>
      <label className={style.label}>
        <span className={style.name}>{name}</span>
        <input
          {...bind.bindEvent}
          className={style.input}
          type={!(type === 'password') ?
            type
            :
            isShowPwd ?
              'text' : 'password'
          }
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </label>

      {type === 'password' ?
        isShowPwd ?
          <EyeOutlined className={style.eye} onClick={toggleShowPwd} />
          :
          <EyeInvisibleOutlined className={style.eye} onClick={toggleShowPwd} />
        :
        null}
      <span className={warn ? style.warn : style.msg}>{msg}</span>
    </div>
  )
}

export default Input
