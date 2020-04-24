/**
 * @ Author: zao
 * @ Create Time: 2020-03-19
 * @ Modified by: zao
 * @ Description: 登陆/注册按钮
 */

import React, { ReactElement } from 'react';
import {Button} from 'antd'
import style from './LoginButton.module.scss';

interface Props {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  value?:string;
  loading?: boolean;
  disabled?: boolean;
}

function LoginButton({className,value='登录/注册',loading,disabled}: Props): ReactElement {
  return (
        <Button type='primary' disabled={disabled} htmlType='submit' loading={loading} className={`${style.container} ${className}`}>{value}</Button>
  )
}

export default LoginButton
