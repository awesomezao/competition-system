/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: RadioGroup主要用于性别input选项
 */

import React, { ReactElement } from 'react'

import style from './RadioGroupUI.module.scss'

interface Props {
  name: string;
  radioList: any[];
  bind: any;
}

function RadioGroup({ name, radioList, bind }: Props): ReactElement {
  const handleChange = (e: any) => {
    bind(e.target.value)
  }
  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <div className={style.radioList} onChange={handleChange}>
        {radioList.map((item) => {
          return (
            <label className={style.radio} key={item}>
              <input type="radio" name={name} value={item} />
              <span>{item}</span>
            </label>
          )
        })}
      </div>

    </div>
  )
}

export default RadioGroup
