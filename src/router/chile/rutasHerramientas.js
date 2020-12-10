export default [
  {
    path: '/mantenedores/documentos',
    name: 'mantenedor-documentos',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/tools/vistas/MantenedorDocumentos.vue')
  }
];
