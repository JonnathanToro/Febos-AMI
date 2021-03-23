export default [
  {
    path: 'factura-electronica/emision/basica',
    name: 'e-bill-basic-issue',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/dte/vistas/EmisionBasica.vue')
  },
  {
    path: 'factura-electronica/:categoria/:vista',
    name: 'e-bull-files',
    meta: { permiso: 'WB001', requiereLogin: true },
    // component: () => import('@/febos/chile/dte/vistas/emitidos/Todos.vue')
    component: () => import('@/febos/chile/dte/vistas/Documentos.vue')
  },
];
