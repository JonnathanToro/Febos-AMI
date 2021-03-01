export default [
  {
    path: '/documentos/:wizard',
    name: 'Cargar documentos',
    meta: { permiso: 'ED012', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: '/documentos/:wizard/:id',
    name: 'Actualizar documento',
    meta: { permiso: 'ED012', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: '/documentos/:wizard/:id',
    name: 'Enviar a flujo documento',
    meta: { requiereLogin: true }, // TODO: set permission
    component: () => import('@/febos/chile/dnt/vistas/Wizard')
  },
  {
    path: '/expedientes/:vista',
    name: 'expedientes',
    meta: { permiso: 'ED008', requiereLogin: true },
    component: () => import('@/febos/chile/dnt/vistas/Files')
  }
];
