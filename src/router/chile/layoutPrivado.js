const layoutPrivado = [
  {
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {permiso: 'WB001'},
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/page2',
        name: 'page-2',
        meta: {permiso: 'WB002',requiereLogin:true},
        component: () => import('@/views/Page2.vue')
      },
    ],
  }
]

export default layoutPrivado
