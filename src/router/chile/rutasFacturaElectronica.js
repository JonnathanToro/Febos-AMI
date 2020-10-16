export default [
  {
    path: "/factura-electronica/emision/basica",
    name: "factura-electronica-emitir-basico",
    meta: { permiso: "WB001", requiereLogin: true},
    component: () => import("@/febos/chile/dte/vistas/EmisionBasica.vue")
  },
  {
    path: '/factura-electronica/:categoria/:vista',
    name: 'factura-electronica-documentos',
    meta: {permiso: 'WB001',requiereLogin:true},
    //component: () => import('@/febos/chile/dte/vistas/emitidos/Todos.vue')
    component: () => import('@/febos/chile/dte/vistas/Documentos.vue')
  },
]
