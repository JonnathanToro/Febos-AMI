const layoutPrivado = [
  {
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {permiso: 'WB001', requiereLogin: true},
        component: () => import('@/views/Home.vue')
      }, {
        path: '/usuario/perfil',
        name: 'Perfil de Usuario',
        meta: {permiso: 'WB001', requiereLogin: true},
        component: () => import('@/febos/global/usuario/vistas/perfil/Perfil.vue')
      },
      {
        path: '/page2',
        name: 'page-2',
        meta: {permiso: 'WB002', requiereLogin: true},
        component: () => import('@/views/Page2.vue')
      },
    ],
  }
]

export default layoutPrivado
