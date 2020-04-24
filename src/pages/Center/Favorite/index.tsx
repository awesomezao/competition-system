import React, { ReactElement, useState } from 'react';

import { Spin } from 'antd';

import Item, { Iitem } from '@/components/commons/ProjectItem';

import { getUserRelatedItem } from '@/services/apis/item';
import { transformItemList } from '@/utils/itemDataTransfer';
import { useRequest } from '@umijs/hooks'
import Retry from '@/components/commons/Retry'

import style from './Favorite.module.scss';

interface Props {

}

function Favorite({ }: Props): ReactElement {
  const [meetingList, setMeetingList] = useState<any[]>()
  const meetingListR = useRequest(() => getUserRelatedItem(3), {
    onSuccess: (result, params) => {
      if (result.data.meetings) {
        setMeetingList(transformItemList(result.data.meetings))
      }
    }
  })

  return (
      <Spin wrapperClassName={style.container} spinning={meetingListR.loading}>
        {
          meetingListR.error
            ? <Retry className={style.err} callback={meetingListR.run} />
            : <div className={style.list}>{meetingList?.map((item: any,index) => {
              return <Item key={`favorite--${index}--${item.id}`} item={item} />
            })}</div>
        }
      </Spin>
  )
}

export default Favorite
