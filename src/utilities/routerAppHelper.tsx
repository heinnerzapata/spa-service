import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

interface IAppRouteHelper {
  appRoutes: any;
}

const RouterAppHelper: React.FC<IAppRouteHelper> = ({ appRoutes }) => (
  <Switch>
    {
        appRoutes.map(({
          navlabel, collapse, child, path, component, redirect, pathTo,
        }: any, key: number) => {
          if (navlabel) {
            return null;
          }
          if (collapse && child) {
            return child.map(({
              collapse: subLevelCollapse,
              subchild,
              path: subLevelPath,
              component: subLevelComponent,
            }: any, subLevelKey: number) => {
              if (subLevelCollapse && subchild) {
                return subchild.map(({
                  path: subSubLevelPath,
                  component: subSubLevelComponent,
                }: any, subSubLevelKey: number) => (
                  <Route
                    path={subSubLevelPath}
                    component={subSubLevelComponent}
                    key={subSubLevelKey}
                  />
                ));
              }

              return (
                <Route
                  path={subLevelPath}
                  component={subLevelComponent}
                  key={subLevelKey}
                  exact
                />
              );
            });
          }

          if (redirect && pathTo) {
            return (
              <Redirect from={path} to={pathTo} key={key} />
            );
          }

          return (
            <Route
              path={path}
              component={component}
              key={key}
              exact
            />
          );
        })
      }
  </Switch>
);

export default RouterAppHelper;
