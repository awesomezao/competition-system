import React, { ReactElement } from 'react';

import RecruitBar from '@/components/RecruitBar';

import style from './RecruitUI.module.scss';

interface Props {
  
}

function Recruit({}: Props): ReactElement {
  return (
    
      <RecruitBar className={style.container}/>
  )
}

export default Recruit