export default [
  {
    path: '/templates-formio',
    name: 'templates',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/formioTemplates/vistas/TemplateMaker.vue')
  },
  {
    path: '/templates',
    name: 'templates',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/chile/formioTemplates/vistas/Templates.vue')
  }
];
