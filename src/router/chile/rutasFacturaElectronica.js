export default [
  {
    path: '/factura-electronica/emitidos/todos',
    name: 'factura-electronica-emitidos-todos',
    meta: {permiso: 'WB001',requiereLogin:true},
    component: () => import('@/febos/chile/dte/vistas/emitidos/Todos.vue')
  },
]
