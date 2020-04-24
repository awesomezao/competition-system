import React, {
  ReactElement,
  useState,
} from 'react';

import RelatedList from '@/components/commons/RelatedItemList';
import { getUserRelatedItem } from '@/services/apis/item';
import { transformItemList } from '@/utils/itemDataTransfer';
import { useRequest } from '@umijs/hooks';

import style from './Related.module.scss';

interface Props {

}


function Related({ }: Props): ReactElement {
  const [createdList, setCreatedList] = useState<any[]>()
  const [appliedList, setAppliedList] = useState<any[]>()
  const myCreatedItemR = useRequest(() => getUserRelatedItem(1), {
    onSuccess: (result, params) => {
      if (result.data) {
        setCreatedList(transformItemList(result.data.meetings))
      }
    }
  })
  const myAppliedItemR = useRequest(() => getUserRelatedItem(2), {
    onSuccess: (result, params) => {
      if (result.data) {
        setAppliedList(transformItemList(result.data.meetings))
      }
    }
  })

  return (
    <div className={style.container} >
      <RelatedList title={'参与者'} loading={myAppliedItemR.loading} itemList={appliedList} errorHandle={myAppliedItemR.refresh}/>
      <RelatedList title={'发布者'} loading={myCreatedItemR.loading} itemList={createdList} errorHandle={myCreatedItemR.refresh}/>
    </div>
  )
}

export default Related
