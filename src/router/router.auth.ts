import {
  SignInWrapper,
  SignUpWrapper,
  RecoverWrapper,
  VerificationCodeWrapper,
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
  '/auth/verification-code': {
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
    path: '/auth/recover/:hash?',
    name: 'Recover',
    icon: 'mdi mdi-account-convert',
    component: RecoverWrapper,
  },
  {
    path: '/auth/verification-code',
    name: 'Verification',
    icon: 'mdi mdi-account-convert',
    component: VerificationCodeWrapper,
  },
  {
    redirect: true,
    path: '/auth',
    pathTo: '/auth/login',
    icon: 'mdi mdi-account-key',
    name: 'Login',
  },
];
