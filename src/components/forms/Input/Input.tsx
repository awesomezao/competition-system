/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局input，仅包含text和password，配合useOnChange使用
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import {
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { DatePicker } from 'antd'

import style from './Input.module.scss';

interface Props {
  type: 'text' | 'password' | 'Date';
  name: string; // input框前面的文字
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
  update?: boolean;
  hasBtn?: boolean;
  btnValue?: string;
  btnStatus?: boolean;
  btnCallback?: (e: React.SyntheticEvent) => any;
  dateCallback?: (...params: any) => any;
  onFocus?: (e: React.SyntheticEvent) => any;
  onBlur?: (e: React.SyntheticEvent) => any;
  onInput?: (e: React.SyntheticEvent) => any;
}

function Input(props: Props): ReactElement {
  const {
    type,
    name,
    placeholder = '点击编辑内容',
    bind,
    msg,
    warn = false,
    readOnly = false,
    update = false,
    value,
    hasBtn = false,
    btnValue = '',
    btnCallback,
    btnStatus = false,
    dateCallback,
    onFocus,
    onBlur,
    onInput
  } = props
  const [isShowPwd, setIsShowPwd] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(readOnly)
  const toggleShowPwd = () => {
    setIsShowPwd(!isShowPwd)
  }
  return (
    <div className={`${style.container} ${props.className}`}>
      <label className={style.label}>
        <span className={style.name}>{name}</span>
        {type === 'Date' ? <DatePicker className={style.input} placeholder='选择日期' onChange={dateCallback}/> :
          <input
            className={style.input}
            type={!(type === 'password') ?
              type
              :
              isShowPwd ?
                'text' : 'password'
            }
            placeholder={placeholder}
            readOnly={isReadOnly}
            value={value || ''}
            {...bind?.bindEvent}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onInput}
          />}
        {type === 'password' ?
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
        {update ? (<span className={style.update} onClick={() => setIsReadOnly(false)}>修改</span>) : null}
      </label>


      <span className={warn ? style.warn : style.msg}>{msg}</span>
    </div>
  )
}

export default Input
