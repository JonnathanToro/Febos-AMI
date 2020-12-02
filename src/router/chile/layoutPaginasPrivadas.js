const layoutPaginasPublicas = [
  {
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
      {
        path: '/iniciando',
        name: 'iniciando',
        meta: {requiereLogin: true},
        component: () => import('@/febos/global/usuario/vistas/Iniciando.vue')
      },
      {
        path: '/empresas/seleccionar',
        name: 'selectorEmpresa',
        meta: {requiereLogin: true},
        component: () => import('@/febos/global/empresas/vistas/SelectorEmpresa.vue')
      },
      {
        path: '/verificar-qr/:febosId',
        name: 'verificar-qr',
        meta: {requiereLogin: true},
        component: () => import('@/febos/chile/verificarQr/vistas/VerificacionQr.vue')
      },
    ]
  }

]

export default layoutPaginasPublicas



