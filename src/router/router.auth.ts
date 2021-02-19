import {
  SignInWrapper,
  SignUpWrapper,
  RecoverWrapper,
} from 'containers/wrappers';

import authBg from 'assets/images/big/v7-auth-bg.png';
import authBg2 from 'assets/images/big/v7-auth-bg2.jpg';

export interface IAuthPhysicalRoutes {
  [selector: string]: any;
}

export const physicalPaths: IAuthPhysicalRoutes = {
  '/auth/register': {
    background: authBg2,
  },
  '/auth/login': {
    background: authBg,
  },
  '/auth/recover': {
    background: authBg,
  },
};

export const authRoutes = [
  {
    path: '/auth/register',
    name: 'Register',
    icon: 'mdi mdi-account-plus',
    component: SignUpWrapper,
  },
  {
    path: '/auth/login',
    name: 'Login',
    icon: 'mdi mdi-account-key',
    component: SignInWrapper,
  },
  {
    path: '/auth/recover',
    name: 'Recover',
    icon: 'mdi mdi-account-convert',
    component: RecoverWrapper,
  },
  {
    redirect: true,
    path: '/auth',
    pathTo: '/auth/login',
    icon: 'mdi mdi-account-key',
    name: 'Login',
  },
];
