import React, { ReactElement } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, withRouter, useLocation, SwitchProps } from 'react-router-dom'
import './AnimationWrapper.scss'
interface Props extends SwitchProps {
  duration?: number;
  type?: 'string';
  children?: React.ReactNode
}


const AnimationWrapper = ({ duration, type, children }: Props) => {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={type || 'forward'}
        timeout={duration || 300}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}


export default AnimationWrapper
