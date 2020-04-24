import React, { Suspense } from 'react';

import * as H from 'history';
import ReactRouter, {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AnimationWrapper from '@/components/animation/AnimationWrapper'
import LoadingPage from '@/components/commons/Loading';
import AuthPage from '@/components/commons/AuthPage'

export interface Iroute extends ReactRouter.RouteProps {
  name?: string;
  path: string;
  requireAuth?: boolean;
  redirect?: H.LocationDescriptor;
  childRoutes?: Iroute[];
}


const renderRoutes = (routes: Iroute[], isLogin: boolean, extraProps: any = {}, switchProps: ReactRouter.SwitchProps = {}) => {
  if (!Array.isArray(routes)) {
    return null
  }
  return (

    <Suspense fallback={<LoadingPage />}>
      <AnimationWrapper>
        <Switch {...switchProps}>
          {routes.map((route, i) => {
            if (route.redirect) {
              return (
                <Redirect
                  key={route.path || i}
                  exact={route.exact}
                  strict={route.strict}
                  from={route.path}
                  to={route.redirect}
                />
              )
            }
            return (
              <Route
                key={route.path || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={(props) => {
                  let renderChildRoutes = route.requireAuth && !isLogin ? <AuthPage />
                    : route.childRoutes ?
                      renderRoutes(route.childRoutes, isLogin) : null;
                  if (route.component) {
                    return (
                      <route.component {...props} {...extraProps} route={route}>
                        {renderChildRoutes}
                      </route.component>
                    )
                  }
                  return renderChildRoutes
                }}
              />
            )
          })}
        </Switch>
      </AnimationWrapper>
    </Suspense>



  )
}

export default renderRoutes;
