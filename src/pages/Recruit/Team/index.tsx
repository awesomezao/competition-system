import React, { ReactElement } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import UploadInput from '@/components/UploadInput';

import style from './TeamUI.module.scss';

interface Props {
  
}

function Team({}: Props): ReactElement {
  return (
    <form className={style.container}>
      <Input type='text' name='项目名称'/>
      <Input type='text' name='报名时间' />
      <Textarea name='项目简介' />
      <Input type='text' name='负责老师' />
      <Textarea name='报名要求' />
      <UploadInput name='上传附件' />
      <Button type='submit' value='确定' className={style.btn}/>
    </form>
  )
}

export default Team
