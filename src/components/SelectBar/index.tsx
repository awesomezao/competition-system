/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 主页类别选择组件
 * TODO: remember to bind event
 */

import React, { ReactElement, useState } from 'react'

import style from './SelectBarUI.module.scss'

interface Props {
  name: string;
  typeList: string[];
  bind?: any;
}

function SelectBar({ name, typeList, bind }: Props): ReactElement {
  const [typeTarget, setTypeTarget] = useState(typeList[0])
  const handleChange = (e: any) => {
    // bind(e.target.value)
    setTypeTarget(e.target.value)
  }
  return (
    <div className={style.container}>
      <div className={style.typeName}>{name}</div>
      <div className={style.typeList} onChange={handleChange}>
        {typeList.map((item) => (
          <label className={typeTarget === item ? style.active : style.item} key={item}>
            {item}
            <input type="radio" name={name} value={item} />
          </label>
        ))}
      </div>

    </div>
  )
}

export default SelectBar
