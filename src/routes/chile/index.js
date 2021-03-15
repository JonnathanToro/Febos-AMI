import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';

export default [
  {
    path: '/:portal',
    component: () => import('@/layouts/PortalPage'),
    children: [
      ...publicRoutes,
      ...privateRoutes
    ]
  }
];
