import {
  DashboardMainWrapper,
  MachineRegisterWrapper,
  ProfileWrapper,
  MachineWrapper,
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
  '/machine-register': {
    path: '/machine-register',
    name: 'Machine register',
    icon: 'mdi mdi-book-open-variant',
    component: MachineRegisterWrapper,
  },
  '/machine': {
    path: '/machine',
    hide: true,
    name: 'Machine',
    icon: 'mdi mdi-book-open-variant',
    component: MachineWrapper,
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
  physicalPaths['/machine-register'],
  physicalPaths['/profile'],
  physicalPaths['/machine'],
  {
    path: '/',
    pathTo: '/dashboards/main-dashboard',
    name: 'Dashboard',
    redirect: true,
  },
];
