const layoutPaginasPublicas = [
  {
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [
      {
        path: '/ingreso',
        name: 'ingreso',
        component: () => import('@/febos/global/usuario/vistas/Ingreso.vue')
      },
      {
        path: '/pages/error-404',
        name: 'page-error-404',
        component: () => import('@/views/pages/Error404.vue')
      },
    ]
  }

]

export default layoutPaginasPublicas



