export default [
  {
    path: '/expedientes/:vista',
    name: 'En curso',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files.vue')
  }
];
