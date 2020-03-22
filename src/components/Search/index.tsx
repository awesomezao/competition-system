import React, { ReactElement } from 'react'

import { Input } from 'antd'

import style from './SearchUI.module.scss'

interface Props {
  className?: string;
  showSearch: boolean;
}

function Search({className,showSearch }: Props): ReactElement {
  const { Search } = Input
  return (
    <div className={`${className} ${showSearch?style.wrapper : style.hideWrapper}`} >
      <div className={style.container}>
        <Search className={style.show} placeholder='搜索会议/时间' enterButton/>
      </div>
    </div>

  )
}

export default Search
