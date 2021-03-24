export default [
  {
    path: 'mantenedores/documentos',
    name: 'maintainer-files',
    meta: { permiso: 'ED005', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDocumentos.vue')
  },
  {
    path: 'mantenedores/instituciones',
    name: 'maintainer-institutions',
    meta: { permiso: 'ED006', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorInstitutions.vue')
  },
  {
    path: 'mantenedores/destinos',
    name: 'maintainer-subjects',
    meta: { permiso: 'ED007', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDestinos.vue')
  },
  {
    path: '/mantenedores/actividades',
    name: 'mantenedor-actividades',
    meta: { permiso: 'ED007', requiereLogin: true }, // TODO: change permission
    component: () => import('@/febos/chile/tools/vistas/Activities.vue')
  }
];
