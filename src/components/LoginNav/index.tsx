import React, { ReactElement } from 'react'

import LoginNavUI from './LoginNavUI'

interface Props {
  className?: string;
}

function LoginNav({}: Props): ReactElement {
  return (
    <LoginNavUI/>
  )
}

export default LoginNav
