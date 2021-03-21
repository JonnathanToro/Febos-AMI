export default [
  {
    path: '/aprobaciones/:vista',
    name: 'aprobaciones',
    meta: { permiso: '*', requiereLogin: true }, // TODO: SET PERMISSION
    component: () => import('@/febos/chile/approvals/vistas/Trays')
  },
  {
    path: '/aprobaciones/expedientes/:vista',
    name: 'aprobaciones-expedientes',
    meta: { permiso: '*', requiereLogin: true }, // TODO: SET PERMISSION
    component: () => import('@/febos/chile/approvals/vistas/ApprovalFiles')
  }
];
