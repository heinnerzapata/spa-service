import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

interface IAuthRouteHelper {
  authRoutes: any;
}

const RouterAuthHelper: React.FC<IAuthRouteHelper> = ({ authRoutes }) => (
  <Switch>
    {
      authRoutes.map(({
        redirect, pathTo, path, component,
      }: any, key: number) => {
        if (redirect && pathTo) {
          return (
            <Redirect from={path} to={pathTo} key={key} />
          );
        }

        return (
          <Route path={path} component={component} key={key} />
        );
      })
    }
  </Switch>
);

export default RouterAuthHelper;
