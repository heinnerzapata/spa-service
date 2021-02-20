import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import V7MainContainer from 'containers/V7MainContainer';
import { authRoutes, physicalPaths } from 'router/router.auth';
import RouterAuthHelper from 'utilities/routerAuthHelper';
import { V7AuthHeader } from 'components';

const AuthLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="authentications page-auth-wrapper-with-footer"
      style={{
        backgroundImage: `url(${physicalPaths[pathname].background})`,
        backgroundSize: 'cover',
        height: '100vh',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'auto',
      }}
    >
      <V7MainContainer shouldAuth={false}>
        <V7AuthHeader />
        <RouterAuthHelper authRoutes={authRoutes} />
      </V7MainContainer>
    </div>
  );
};

export default withRouter(AuthLayout);
