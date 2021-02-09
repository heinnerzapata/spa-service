import {
  SignInWrapper,
  SignUpWrapper,
  RecoverWrapper,
} from 'containers/wrappers';

const authRoutes = [
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

export default authRoutes;
