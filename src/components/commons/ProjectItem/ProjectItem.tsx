/**
 * @ Author: zao
 * @ Create Time: 2020-03-20
 * @ Modified by: zao
 * @ Description: 全局各个单项比赛，发布的消息item
 */

import React, {
  ReactElement,
  useState,
} from 'react';

import { useImmer } from 'use-immer';

import { useHistory } from 'react-router-dom'

import Button from '@/components/commons/Button';
import {
  ClockCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { Iitem } from './';
import style from './ProjectItem.module.scss';
import itemDefaultSrc from '@/assets/images/item-default@2x.png'

interface Props {
  item: Iitem;
  btnShow?: boolean;
}

function Item({ item }: Props): ReactElement {
  enum BtnColor { already = 'rgba(250,167,48,1)', lapse = 'rgba(159,158,157,1)' }
  const [itemState, setItemState] = useImmer({
    ...item
  })
  const [btnShow, setBtnShow] = useState(false)
  const [BtnStatus, setBtnStatus] = useImmer({
    color: BtnColor.already,
    value: '有效'
  })
  const history = useHistory()

  const handleClick = () => {
    history.push(`/info/${item.id}`)
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <img className={style.img} src={itemState.src || itemDefaultSrc} alt="" />
      <div className={style.titleBar}>
        <div className={style.title}>{itemState.title}</div>
        <StarOutlined />
      </div>
      <div className={style.timeBar}>
        <div className={style.time}>
          <ClockCircleOutlined />
          <div className={style.font}>{itemState.time}</div>
        </div>
        {btnShow ? <Button {...BtnStatus} fontSize={8} className={style.btn} /> : null}
      </div>
    </div>
  )
}

export default Item
