/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: RadioGroup主要用于性别input选项
 */

import React, { ReactElement, useState } from 'react';
import { useOnUpdate } from '@/hooks'
import style from './RadioGroup.module.scss';

interface Props {
  name: string;
  radioList: any[];
  bind: any;
  initialData?: any;
}

function RadioGroup({ name, radioList, bind, initialData = radioList[0] }: Props): ReactElement {
  const [checkedTarget, setCheckedTarget] = useState(initialData)
  const handleChange = (e: any) => {
    bind(e.target.value)
    setCheckedTarget(e.target.value)
  }
  useOnUpdate(() => {
    setCheckedTarget(initialData)
  }, [initialData])
  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <div className={style.radioList} onChange={handleChange}>
        {radioList.map((item) => {
          return (
            <label className={style.radio} key={item}>
              <input type="radio" name={name} value={item} checked={checkedTarget === item} onChange={() => {
              }} />
              <span>{item}</span>
            </label>
          )
        })}
      </div>

    </div>
  )
}

export default RadioGroup
