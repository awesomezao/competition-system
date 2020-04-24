import React, { ReactElement } from 'react';

import RecruitBar from '@/components/bars/RecruitBar';

import style from './Recruit.module.scss';

interface Props {

}

function Recruit({ }: Props): ReactElement {
  return (

    <RecruitBar className={style.container} />
  )
}

export default Recruit