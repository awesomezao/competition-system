import React, { ReactElement } from 'react'

interface Props {
  children: ReactElement;
}

function BlankLayout({ children }: Props): ReactElement {
  return (
    <>{children}</>
  )
}

export default BlankLayout
