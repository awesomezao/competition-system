import React, { ReactElement } from 'react'
import { Button } from 'antd'
import {ButtonProps} from 'antd/lib/button'
interface Props extends ButtonProps{
  
}

function MyButton(props: Props): ReactElement {
  return (
    <div>
      <Button {...props}></Button>
    </div>
  )
}

export default MyButton

function A() {
  return (
    <MyButton/>
  )
}