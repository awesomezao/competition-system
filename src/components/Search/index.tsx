/**
 * @ Author: zao
 * @ Create Time: 2020-03-22
 * @ Modified by: zao
 * @ Description: 封装antd search组件
 * TODO: 记得添加api和逻辑
 */

import React, { ReactElement } from 'react';

import { Input } from 'antd';

import style from './SearchUI.module.scss';

interface Props {
  className?: string;
  showSearch: boolean;
}

function Search({ className, showSearch }: Props): ReactElement {
  const { Search } = Input
  return (
    <div className={`${className} ${showSearch ? style.wrapper : style.hideWrapper}`} >
      <div className={style.container}>
        <Search className={style.show} placeholder='搜索会议/时间' enterButton />
      </div>
    </div>

  )
}

export default Search
