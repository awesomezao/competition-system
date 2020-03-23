/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 全局系统消息浮动窗口
 */

import React, { ReactElement } from 'react'

import style from './SystemMsgUI.module.scss'

interface Props {
  name: string;
  msgList: { id: number | string; title: string; }[];
}

function SystemMsg({ name, msgList }: Props): ReactElement {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{name}</h2>
      <ul className={style.msgList}>
        {msgList.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SystemMsg
