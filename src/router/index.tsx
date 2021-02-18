import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import mainRouter from 'router/router.main';

const Router: React.FC = () => (
  <main>
    <Switch>
      {
        mainRouter.map(({ path, component }, key) => (
          <Route key={key} path={path} component={component} />
        ))
      }
    </Switch>
  </main>
);

export default withRouter(Router);
