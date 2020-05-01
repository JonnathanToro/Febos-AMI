const layoutPaginasPublicas = [
  {
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
      {
        path: '/iniciando',
        name: 'iniciando',
        meta:{requiereLogin:true},
        component: () => import('@/febos/global/usuario/vistas/Iniciando.vue')
      },
      {
        path: '/empresa/seleccionar',
        name: 'selectorEmpresa',
        meta:{requiereLogin:true},
        component: () => import('@/febos/global/empresas/vistas/SelectorEmpresa.vue')
      },
    ]
  }

]

export default layoutPaginasPublicas



