export default [
  {
    path: '/documentos/:wizard',
    name: 'Cargar documentos',
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
    path: '/doc-digital/:vista',
    name: 'Entrada',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/DocDigital.vue')
  }
];
