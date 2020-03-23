import React, {
  ReactElement,
  useState,
} from 'react';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import RadioGroup from '@/components/RadioGroup';

import style from './SignupUI.module.scss';

interface Props {

}

function Signup({ }: Props): ReactElement {
  const [avatar, setAvatar] = useState()
  const [gender,setGender]=useState()

  return (
    <form className={style.form}>
      <Avatar msg='上传头像' bind={setAvatar}/>
      <Input type='text' name='用户名' msg='最长不超过7个字符'/>
      <RadioGroup name='性别' radioList={['男', '女']} bind={setGender} />
      <Input type='password' name='密码' msg='密码不少于8位'/>
      <Input type='password' name='确认密码' msg='密码不少于8位' />
      <Input type='text' name='邮箱'/>
      <Input type='text' name='电话'/>
      <Input type='text' name='单位' />
      <Button value='保存' type='submit' className={style.btn}/>
    </form>
  )
}

export default Signup
