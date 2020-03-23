import React, { ReactElement } from 'react';

import CenterNav from '@/components/CenterNav';
import { Iroute } from '@/utils/renderRoutes';

interface Props {
  route: Iroute;
  children: React.ReactNode;
}

function CenterLayout({ route, children }: Props): ReactElement {
  return (
    <div>
      <CenterNav/>
      <div>{children}</div>
    </div>
  )
}

export default CenterLayout
