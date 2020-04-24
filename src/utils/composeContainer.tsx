import React from 'react';

import { Container } from 'unstated-next';

export default function compose(...containers: any) {
  return function Component(props: any) {
    return containers.reduceRight((children: React.ReactChildren, Container: Container<any>) => {
      return <Container.Provider>{children}</Container.Provider>
    }, props.children)
  }
}