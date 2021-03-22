import routes from './routes';

export default [
  {
    path: 'iniciando',
    name: 'iniciando',
    meta: { layout: 'full-page', requiereLogin: true },
    component: () => import('@/febos/global/usuario/vistas/Iniciando.vue')
  },
  {
    path: 'empresas/seleccionar',
    name: 'selectorEmpresa',
    meta: { layout: 'full-page', requiereLogin: true },
    component: () => import('@/febos/global/empresas/vistas/SelectorEmpresa.vue')
  },
  {
    path: 'verificar-qr/:febosId',
    name: 'verificar-qr',
    meta: { layout: 'full-page', requiereLogin: false },
    component: () => import('@/febos/chile/verificarQr/vistas/VerificacionQr.vue')
  },
  {
    path: '/',
    name: 'inicio',
    meta: { requiereLogin: true },
    component: () => import('@/febos/global/inicio/vistas/Inicio.vue')
  },
  {
    path: 'usuario/perfil',
    name: 'Perfil de Usuario',
    meta: { permiso: 'ED032', requiereLogin: true },
    component: () => import('@/febos/global/usuario/vistas/perfil/Perfil.vue')
  },
  {
    path: 'configuraciones/empresa',
    name: 'settings-company',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/global/empresas/vistas/perfilEmpresa.vue')
  },
  {
    path: 'configuraciones/usuarios',
    name: 'settings-users',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/global/empresas/vistas/gestUsuarios.vue')
  },
  {
    path: 'configuraciones/cafs',
    name: 'settings-cafs',
    meta: { permiso: 'WB001', requiereLogin: true },
    component: () => import('@/febos/global/empresas/vistas/gestCAFs.vue')
  },
  ...routes
];
