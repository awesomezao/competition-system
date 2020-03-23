import React, { ReactElement } from 'react';

import Item from '@/components/Item';
import SelectBar from '@/components/SelectBar';
import SystemMsg from '@/components/SystemMsg';

interface Props {
  
}

function Home({}: Props): ReactElement {
  return (
    <div>
      <SelectBar name='类别' typeList={['全部','竞赛报名','科研团队','学生组队']}/>
      <Item btnShow={true} item={{
        src: 'https://dummyimage.com/240x107',
        title: '时代发生大幅度沙发上地方的说法',
        favorite: false,
        time: '2019.10.10 14:00-17:00'
      }} />
      <SystemMsg name='热门会议' msgList={[{ id: '1', title: 'asda时代发生大苏打速度sd' }, { id: '2', title: 'asda时代发生大苏打速度sd' }]} />
    </div>
  )
}

export default Home
