export default [
  {
    path: '/administracion/usuarios',
    name: 'Unidades Organizativas',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/global/management/vistas/UsersManagement.vue')
  }
];
