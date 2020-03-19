import React from 'react'
import ReactRouter, { Switch, Route, Redirect } from 'react-router-dom'
import * as H from 'history';

export interface Iroute extends ReactRouter.RouteProps {
  name?: string;
  path: string;
  requireAuth?: boolean;
  redirect?: H.LocationDescriptor;
  childRoutes?: Iroute[];
}

const renderRoutes = (routes: Iroute[], extraProps: any = {}, switchProps: ReactRouter.SwitchProps = {}) => {

  if (!Array.isArray(routes)) {
    return null
  }
  return (
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
              const renderChildRoutes = route.childRoutes ? renderRoutes(route.childRoutes) : null;
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
  )
}

export default renderRoutes;
