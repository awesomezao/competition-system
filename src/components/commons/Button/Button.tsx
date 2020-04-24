/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局button组件
 */

import React, { ReactElement } from 'react';
import {Button} from 'antd'

import style from './Button.module.scss';

interface Props {
  type?: 'button' | 'reset' | 'submit';
  value: string;
  className?: string;
  onClick?: any;
  color?: string;
  fontSize?: number;
  loading?: boolean;
  disabled?: boolean;
  size?:'large'|'middle'|'small';
}

function MyButton({ type = 'button', value, className, color, fontSize, onClick,loading=false,disabled,size }: Props): ReactElement {
  return (
    // <button type={type} className={`${style.btn} ${className}`} style={{ 'backgroundColor': color, 'fontSize': `${fontSize}px` }} onClick={onClick}>{value}</button>
    <Button type='primary' size={size} htmlType={type} loading={loading} className={`${style.btn} ${className}`} style={{ 'backgroundColor': color, 'fontSize': `${fontSize}px` }} onClick={onClick} disabled={disabled}>{value}</Button>
  )
}

export default MyButton
