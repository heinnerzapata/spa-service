import {
  DashboardMainWrapper,
  DeviceRegisterWrapper,
  ProfileWrapper,
} from 'containers/wrappers';

export interface IPhysicalRoutes {
  [selector: string]: any;
}

export const physicalPaths: IPhysicalRoutes = {
  '/dashboards/main-dashboard': {
    path: '/dashboards/main-dashboard',
    name: 'Main dashboard',
    mini: 'B',
    icon: 'mdi mdi-adjust',
    component: DashboardMainWrapper,
  },
  '/device-register': {
    path: '/device-register',
    name: 'Device register',
    icon: 'mdi mdi-book-open-variant',
    component: DeviceRegisterWrapper,
  },
  '/profile': {
    hide: true,
    path: '/profile',
    name: 'Profile',
    component: ProfileWrapper,
  },
};

export const appRoutes = [
  {
    navlabel: true,
    name: 'Principal',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    collapse: true,
    path: '/dashboards',
    name: 'Dashboards',
    state: 'dashboardpages',
    icon: 'mdi mdi-gauge',
    child: [
      physicalPaths['/dashboards/main-dashboard'],
    ],
  },
  physicalPaths['/device-register'],
  physicalPaths['/profile'],
  {
    path: '/',
    pathTo: '/dashboards/main-dashboard',
    name: 'Dashboard',
    redirect: true,
  },
];
