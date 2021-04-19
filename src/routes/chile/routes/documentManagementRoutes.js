export default [
  {
    path: 'gestion-documentos',
    name: 'document-management',
    meta: { permiso: 'ED012', requiereLogin: true },
    component: () => import('@/febos/global/documentManagement/vistas/DocumentManagement.vue')
  }
];
