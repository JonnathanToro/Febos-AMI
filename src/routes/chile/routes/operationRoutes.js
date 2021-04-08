export default [
  {
    path: 'administracion/usuarios',
    name: 'users-management',
    meta: { permiso: 'WB001', requiereLogin: true }, // TODO set permission
    component: () => import('@/febos/global/management/vistas/UsersManagment.vue')
  },
];
