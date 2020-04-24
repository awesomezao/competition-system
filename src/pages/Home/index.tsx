// TODO: remember to set item total number

import React, {
  ReactElement,
  useState,
  useEffect
} from 'react';

import {
  Pagination,
  Spin,
} from 'antd';

import SelectBar from '@/components/bars/SelectBar';
import Item, { Iitem } from '@/components/commons/ProjectItem';
import { transformItemList } from '@/utils/itemDataTransfer';
import { useRequest, useUnmount } from '@umijs/hooks';
import {
  getHomeItemList,
  getItemTypes,
  getHomeItemListByCondition
} from '@/services/apis/item';


import style from './Home.module.scss';
import { useOnMount } from '@/hooks';

interface Props {

}

function Home({ }: Props): ReactElement {
  const PER_PAGE = 9 // 每页的最多item数量
  const [type, setType] = useState('-1') // -1代表首页
  const [page, setPage] = useState(1) // 分页page偏移量
  const [meetingNum, setMeetingNum] = useState(0) // item的总数
  const [meetingList, setMeetingList] = useState<any[]>() // item的数据
  const [typeList, setTypeList] = useState<any[]>() // 类别

  const meetingNumR = useRequest(getHomeItemListByCondition, {
    cacheKey: 'meetingNum',
    onSuccess: (result, params) => {
      if (result.data) {
        setMeetingNum(result.data.meetings.length)
      }
    },
    onError: (result, params) => {
      console.log(result)
      
    }
  })
  const meetingListR = useRequest((page = 0) => getHomeItemList(page, PER_PAGE), {
    onSuccess: (result, params) => {
      if (result.data) {
        setMeetingList(transformItemList(result.data.meetings))
      }
    },
    onError: (error) => {
      console.log('错误')
      
      console.log(error)
      
    }
  })
  const typeListR = useRequest(getItemTypes, {
    cacheKey: 'meetingType',
    onSuccess: (result, params) => {
      if (result.data) {
        let types: any[] = result.data.types.map((item: any) => item)
        types.unshift({ typeid: -1, type: '全部' })
        setTypeList(types)
      }
    }
  })
  const typeMeetingListR = useRequest((type: number) => getHomeItemListByCondition(type), {
    manual: true,
    onSuccess: (result, params) => {
      if (result.data) {
        setMeetingList(transformItemList(result.data.meetings))
      }
    }
  })
  // 处理分页
  const handlePagination = async (page: number) => {
    setPage(page)
    meetingListR.run((page - 1) * 9)
  }
  // 处理条件搜索
  const handleTypeChange = async (e: any) => {
    setType(e.target.value)
    if (e.target.value === '-1') {
      setPage(1)
      meetingListR.run(0)
      meetingNumR.run()
    } else {
      typeMeetingListR.run(e.target.value)
    }
  }

  useUnmount(() => {
    meetingNumR.cancel('cancel meetingNumR')
    meetingListR.cancel('cancel meetingListR')
    typeListR.cancel('cancel typeListR')
    
  })

  return (
    <div className={style.container}>
      <Spin spinning={typeListR.loading}>
        <SelectBar className={style.bar} name='类别' typeTarget={type} typeList={typeList} onChange={(e: any) => handleTypeChange(e)} />
      </Spin>


      <div className={style.itemList}>
        <Spin spinning={type === '-1' ? meetingListR.loading : typeMeetingListR.loading}>
          <div className={style.list}>
            {meetingList?.map((item: any) => {
              return <Item key={item.id} item={item} />
            })}
          </div>
        </Spin>

        {
          type === '-1' ?
            <Spin spinning={meetingNumR.loading}>
              <Pagination className={style.pagination} pageSize={PER_PAGE} current={page} total={meetingNum} onChange={handlePagination} hideOnSinglePage={true} />
            </Spin> : null
        }
      </div>

    </div>
  )
}

export default Home
