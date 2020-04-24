/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 封装antd search组件
 * TODO: 记得添加api和逻辑
 */

import React, { ReactElement } from 'react';

import { Input } from 'antd';
import { useHistory } from 'react-router-dom';

import style from './Search.module.scss';

interface Props {
  className?: string;
  targetUrl?: string;
  showSearch: boolean;
}

function Search({ className, showSearch }: Props): ReactElement {
  const history = useHistory()
  const { Search } = Input

  const handleSearch = (value: string) => {
    history.push({ pathname: '/search', state: { value } })
  }
  return (
    <div className={`${className} ${showSearch ? style.wrapper : style.hideWrapper}`} >
      <div className={style.container}>
        <Search className={style.show} placeholder='搜索会议/时间' onSearch={handleSearch} enterButton />
      </div>
    </div>

  )
}

export default Search
