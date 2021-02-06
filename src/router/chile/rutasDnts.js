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
    name: 'expedientes',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files')
  }
];
