import React, { ReactElement } from 'react'

import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import UploadInput from '@/components/UploadInput'
import Button from '@/components/Button'

import style from './StudentUI.module.scss'

interface Props {

}

function Student({ }: Props): ReactElement {
  return (
    <form className={style.container}>
      <Input type='text' name='比赛名称' />
      <Input type='text' name='比赛时间' />
      <Textarea name='比赛简介' />
      <Input type='text' name='队长' />
      <Input type='text' name='队长电话' />
      <Input type='text' name='招募队员人数' />
      <Textarea name='招募要求' />
      <UploadInput name='相关文档' />
      <Button type='submit' value='确定' className={style.btn} />
    </form>
  )
}

export default Student
