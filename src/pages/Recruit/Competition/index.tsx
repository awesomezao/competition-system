import React, { ReactElement } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import UploadInput from '@/components/UploadInput';

import style from './CompetitionUI.module.scss';

interface Props {

}

function Competition({ }: Props): ReactElement {
  return (
    <form className={style.container}>
      <Input type='text' name='比赛名称' />
      <Input type='text' name='报名时间' />
      <Textarea name='比赛简介' />
      <Input type='text' name='承办单位' />
      <Input type='text' name='负责人' />
      <Textarea name='奖品' />
      <Textarea name='报名要求' />
      <UploadInput name='相关文档' />
      <Button type='submit' value='确定' className={style.btn} />
    </form>
  )
}

export default Competition
