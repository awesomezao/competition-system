import React, { ReactElement } from 'react'

import style from './ButtonUI.module.scss'

interface Props {
  type?: 'button' | 'reset' | 'submit';
  value: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  color?: string;
}

function Button({type='button',value,className,color}: Props): ReactElement {
  return (
    <button type={type} className={`${style.btn} ${className}`} style={{'backgroundColor':color}}>{value}</button>
  )
}

export default Button
