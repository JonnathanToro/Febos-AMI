const layoutPaginas = [
  {
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
      {
        path: '/ingreso',
        name: 'ingreso',
        meta:{requiereLogin:false},
        component: () => import('@/febos/global/usuario/vistas/Ingreso.vue')
      },
      {
        path: '/iniciando',
        name: 'iniciando',
        meta:{requiereLogin:true},
        component: () => import('@/febos/global/usuario/vistas/Iniciando.vue')
      },
      {
        path: '/pages/error-404',
        name: 'page-error-404',
        component: () => import('@/views/pages/Error404.vue')
      },
    ]
  }

]

export default layoutPaginas



