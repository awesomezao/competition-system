import React, { ReactElement } from 'react'

import style from './ButtonUI.module.scss'

interface Props {
  type?: 'button' | 'reset' | 'submit';
  value: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  color?: string;
  fontSize?: number;
}

function Button({type='button',value,className,color,fontSize}: Props): ReactElement {
  return (
    <button type={type} className={`${style.btn} ${className}`} style={{'backgroundColor':color,'fontSize':`${fontSize}px`}}>{value}</button>
  )
}

export default Button
