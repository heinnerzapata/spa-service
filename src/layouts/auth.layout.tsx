import React from 'react';
import { withRouter } from 'react-router-dom';
import V7MainContainer from 'containers/V7MainContainer';
import authRoutes from 'router/router.auth';
import RouterAuthHelper from 'utilities/routerAuthHelper';
import { V7AuthHeader } from 'components';

const AuthLayout: React.FC = () => (
  <div className="authentications">
    <V7MainContainer shouldAuth={false}>
      <V7AuthHeader />
      <div style={{ overflow: 'auto' }}>
        <RouterAuthHelper authRoutes={authRoutes} />
      </div>
    </V7MainContainer>
  </div>
);

export default withRouter(AuthLayout);
