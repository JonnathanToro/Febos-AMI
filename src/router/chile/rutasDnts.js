export default [
  {
    path: '/expedientes/:vista',
    name: 'En curso',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files.vue')
  },
  {
    path: '/oficinas/:vista',
    name: 'Entrada',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/OficinaPartesInbox.vue')
  },
  {
    path: '/doc-digital/:vista',
    name: 'Entrada',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/DocDigital.vue')
  }

];
