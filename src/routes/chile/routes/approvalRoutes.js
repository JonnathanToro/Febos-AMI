export default [
  {
    path: 'aprobaciones/:view',
    name: 'approval-trays',
    meta: { permiso: '*', requiereLogin: true }, // TODO: SET PERMISSION
    component: () => import('@/febos/chile/approvals/vistas/Trays')
  },
  {
    path: 'aprobaciones/expedientes/:view',
    name: 'approval-files',
    meta: { permiso: '*', requiereLogin: true }, // TODO: SET PERMISSION
    component: () => import('@/febos/chile/approvals/vistas/ApprovalFiles')
  }
];
