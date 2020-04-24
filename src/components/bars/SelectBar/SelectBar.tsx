/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 主页类别选择组件
 * TODO: remember to bind event
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import style from './SelectBar.module.scss';

interface Props {
  name: string;
  typeList?: { typeid: number; type: string }[];
  bind?: any;
  className?: string;
  onChange: (...arg: any) => any;
  typeTarget: string;
}


function SelectBar({ name, typeList, typeTarget, className, onChange }: Props): ReactElement {
  return (
    <div className={`${className} ${style.container}`}>
      <div className={style.typeName}>{name}</div>
      <div className={style.typeList} onChange={onChange}>
        {typeList?.map((item) => (
          <label className={Number(typeTarget) === item.typeid ? style.active : style.item} key={item.typeid}>
            {item.type}
            <input type="radio" name={name} value={item.typeid} />
          </label>
        ))}
      </div>

    </div >
  )
}

export default SelectBar
