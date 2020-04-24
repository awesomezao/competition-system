import React, { ReactElement } from 'react';

import Button from '@/components/commons/Button';
import Input from '@/components/forms/Input/Input';
import Textarea from '@/components/forms/Textarea';
import UploadInput from '@/components/forms/UploadInput';
import {useChange} from '@/hooks'

import style from './Competition.module.scss';

interface Props {

}

function Competition({ }: Props): ReactElement {
  // const name=useChange('')
  // const time=useChange('')
  // const introduction=useChange('')
  // const organizer=useChange('')
  // const hostedBy=useChange('')
  // const name=useChange('')
  return (
    <form className={style.container}>
      {/* <Input type='text' name='比赛名称' />
      <Input type='text' name='报名时间' />
      <Textarea name='比赛简介' />
      <Input type='text' name='承办单位' />
      <Input type='text' name='负责人' />
      <Textarea name='奖品' />
      <Textarea name='报名要求' />
      <UploadInput name='相关文档' />
      <Button type='submit' value='确定' className={style.btn} /> */}
    </form>
  )
}

export default Competition
