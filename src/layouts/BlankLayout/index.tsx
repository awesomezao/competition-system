import React, { ReactElement } from 'react'

interface Props {
  children: React.ReactNode;
}

function BlankLayout({ children }: Props): ReactElement {
  return (
    <>{children}</>
  )
}

export default BlankLayout
