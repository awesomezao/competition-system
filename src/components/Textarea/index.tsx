import React, { ReactElement, useState } from 'react'

import style from './TextareaUI.module.scss'

interface Props {
  name: string; // textarea框前面的文字
  placeholder?: string;
  msg?: string;  // input下方的提示语
  warn?: boolean; // input msg的警告
  bind?: any; // 双向绑定input事件
  className?: string;
  readOnly?: boolean;
}

function Textarea(props: Props): ReactElement {
  const {  name, placeholder = '点击编辑内容', bind = {}, msg, warn = false,readOnly=false } = props

  return (
    <div className={`${style.container} ${props.className}`}>
      <label className={style.label}>
        <span className={style.name}>{name}</span>
        <textarea {...bind.bindEvent} name="name" cols={30} rows={10} placeholder={placeholder} readOnly={readOnly}></textarea>
      </label>
      <span className={warn ? style.warn : style.msg}>{msg}</span>
    </div>
  )
}

export default Textarea
