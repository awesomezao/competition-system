import React, { ReactElement } from 'react'
import HeaderUI from './HeaderUI'

interface Props {
  className?: string;
}

function Header({}: Props): ReactElement {
  return (
    <HeaderUI/>
  )
}

export default Header
