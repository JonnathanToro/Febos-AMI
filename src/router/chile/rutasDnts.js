export default [
  {
    path: '/documentos/:wizard',
    name: 'Cargar documentos',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: '/documentos/:wizard/:id',
    name: 'Actualizar documento',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: '/expedientes/:vista',
    name: 'En curso',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files')
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
