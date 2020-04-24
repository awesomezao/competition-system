/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 全局textarea组件
 */

import React, { ReactElement } from 'react';

import style from './Textarea.module.scss';

interface Props {
  name: string; // textarea框前面的文字
  placeholder?: string;
  msg?: string;  // input下方的提示语
  warn?: boolean; // input msg的警告
  bind?: {
    bindEvent: {
      onChange: (e: React.SyntheticEvent) => any;
      value: string;
    }
  }; // 双向绑定input事件
  className?: string;
  readOnly?: boolean;
  value?: string;
  onInput?: (e: React.SyntheticEvent) => any;
}

function Textarea(props: Props): ReactElement {
  const {
    name,
    placeholder = '点击编辑内容',
    bind,
    msg,
    warn = false,
    readOnly = false,
    value,
    onInput
  } = props

  return (
    <div className={`${style.container} ${props.className}`}>
      <label className={style.label}>
        <span className={style.name}>{name}</span>
        <textarea
         name="name" 
         cols={30} 
         rows={10} 
         placeholder={placeholder}
          readOnly={readOnly} 
          value={value || ''} 
          {...bind?.bindEvent}
          onInput={onInput}
          />
      </label>
      <span className={warn ? style.warn : style.msg}>{msg}</span>
    </div >
  )
}

export default Textarea
