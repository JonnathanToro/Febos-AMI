export default [
  {
    path: 'documentos/:wizard',
    name: 'files-wizard',
    meta: { permiso: 'ED012', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: 'documentos/:wizard/:id',
    name: 'files-wizard-update',
    meta: { permiso: 'ED012', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: 'expedientes/:view',
    name: 'files',
    meta: { permiso: 'ED008', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files')
  }
];
