export default [
  {
    path: 'ingreso',
    name: 'sign-in',
    meta: { layout: 'full-page' },
    component: () => import('@/febos/global/usuario/vistas/Ingreso.vue')
  },
  {
    path: 'pages/error-404',
    name: 'page-error-404',
    meta: { layout: 'full-page' },
    component: () => import('@/views/pages/Error404.vue')
  },
  {
    path: 'no-autorizado',
    name: 'page-error-401',
    meta: { layout: 'full-page' },
    component: () => import('@/views/pages/Error401.vue')
  }
];
