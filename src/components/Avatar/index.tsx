import React, { ReactElement, useState, SyntheticEvent } from 'react'

import { useOnUpdate } from '@/hooks'
import style from './AvatarUI.module.scss'

interface Props {
  msg: string;
  bind: any;
  className?: string;
}

function Avatar({ msg, bind,className }: Props): ReactElement {
  const [avatar, setAvatar] = useState('')
  const uploadImg = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        setAvatar(e.target?.result as any);
        bind(files[0])
      };
    }
  }

  return (
    <div className={`${style.container} ${className}`}>
      <label className={style.label}>
        <img src={avatar} alt="" className={style.img} />
        <input onChange={uploadImg} type="file" className={style.input} />
        <span className={style.msg}>{msg}</span>
      </label>
    </div>
  )
}

export default Avatar
