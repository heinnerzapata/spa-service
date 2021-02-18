import React from 'react';
import { withRouter } from 'react-router-dom';
import V7MainContainer from 'containers/V7MainContainer';
import authRoutes from 'router/router.auth';
import RouterAuthHelper from 'utilities/routerAuthHelper';

const AuthLayout: React.FC = () => (
  <div className="authentications">
    <V7MainContainer shouldAuth={false}>
      <RouterAuthHelper authRoutes={authRoutes} />
    </V7MainContainer>
  </div>
);

export default withRouter(AuthLayout);
