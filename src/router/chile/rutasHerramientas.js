export default [
  {
    path: '/mantenedores/documentos',
    name: 'mantenedor-documentos',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDocumentos.vue')
  },
  {
    path: '/mantenedores/instituciones',
    name: 'mantenedor-instituciones',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorInstitutions.vue')
  }
];
