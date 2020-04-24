/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 头像组件，主要用于在表单输入时起到头像实时预览和上传数据的作用
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import { useOnMount, useOnUpdate } from '@/hooks'
import style from './Avatar.module.scss';

interface Props {
  msg: string;
  bind: any;
  className?: string;
  initialData?: any;
}

function Avatar({ msg, bind, className, initialData = '' }: Props): ReactElement {
  const [avatar, setAvatar] = useState(initialData)
  const uploadImg = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        setAvatar(e.target?.result);
        bind(files[0])
      };
    }
  }
  useOnUpdate(() => {
    if (typeof initialData === 'string') {
      setAvatar(initialData)
    } else {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(initialData);
      reader.onload = e => {
        setAvatar(e.target?.result);
      };
    }

  }, [initialData])
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
