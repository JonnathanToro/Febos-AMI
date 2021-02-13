export default [
  {
    path: '/mantenedores/documentos',
    name: 'mantenedor-documentos',
    meta: { permiso: 'ED005', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDocumentos.vue')
  },
  {
    path: '/mantenedores/instituciones',
    name: 'mantenedor-instituciones',
    meta: { permiso: 'ED006', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorInstitutions.vue')
  },
  {
    path: '/mantenedores/destinos',
    name: 'mantenedor-destinos',
    meta: { permiso: 'ED007', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDestinos.vue')
  }
];
