export default [
  {
    path: 'ingreso',
    name: 'sign-in',
    meta: { layout: 'full-page' },
    component: () => import('@/febos/global/usuario/vistas/Ingreso.vue')
  },
  {
    path: 'no-autorizado',
    name: 'page-error-401',
    meta: { layout: 'full-page' },
    component: () => import('@/views/pages/Error401.vue')
  }
];
