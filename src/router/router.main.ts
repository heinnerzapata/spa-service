import AuthLayout from 'layouts/auth.layout';
import FullLayout from 'layouts/full.layout';

const mainRouter = [
  { path: '/auth', name: 'Auth', component: AuthLayout },
  { path: '/', name: 'Dashboard', component: FullLayout },
];

export default mainRouter;
