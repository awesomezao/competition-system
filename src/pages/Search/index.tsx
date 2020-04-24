// TODO: remember to set item total number

import React, {
  ReactElement,
  useState,
} from 'react';

import {
  Spin,
} from 'antd';

import SelectBar from '@/components/bars/SelectBar';
import Item, { Iitem } from '@/components/commons/ProjectItem';
import { useRequest} from '@/hooks';
import {
  getHomeItemList,
} from '@/services/apis/item';
import { transformItemList } from '@/utils/itemDataTransfer.ts';

import style from './Home.module.scss';

interface Props {
  meetingList: any;
}

function Search({meetingList }: Props): ReactElement {
  // const meetingList = useRequest(
  //   () => getHomeItemList(1, 12),
  //   (origin) => transformItemList(origin.meetings)
  // )
  return (
    <div className={style.container}>
      <Spin spinning={meetingList.loading}>
        <div className={style.itemList}>
          <div className={style.list}>
            {meetingList.value?.map((item: any) => {
              return <Item key={item.id} item={item} />
            })}
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default Search
