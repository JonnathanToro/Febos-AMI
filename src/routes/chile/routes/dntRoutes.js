export default [
  {
    path: 'documentos/:wizard',
    name: 'files-wizard',
    meta: { permiso: 'ED050', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: 'documentos/:wizard/:id',
    name: 'files-wizard-update',
    meta: { permiso: 'ED050', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: 'expedientes/:view',
    name: 'files',
    meta: { permiso: 'ED009', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files')
  },
  {
    path: 'expediente/:view/:id/:idSubject',
    name: 'shared-file',
    meta: { requiereLogin: false },
    component: () => import('@/febos/chile/dnt/vistas/SharedFiles')
  }
];
