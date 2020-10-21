import rutasFacturaElectronica from "./rutasFacturaElectronica";

const layoutPrivado = [
  {
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        name: 'inicio',
        meta: {permiso: 'WB001',requiereLogin:true},
        component: () => import('@/febos/global/inicio/vistas/Inicio.vue')
      },
      {
        path: '/usuario/perfil',
        name: 'Perfil de Usuario',
        meta: {permiso: 'WB001', requiereLogin: true},
        component: () => import('@/febos/global/usuario/vistas/perfil/Perfil.vue')
      },
      {
        path: '/configuraciones/empresa',
        name: 'Perfil de Empresa',
        meta: {permiso: 'WB001', requiereLogin: true},
        component: () => import('@/febos/global/empresas/vistas/perfilEmpresa.vue')
      },
      {
        path: '/page2',
        name: 'page-2',
        meta: {permiso: 'WB002', requiereLogin: true},
        component: () => import('@/views/Page2.vue')
      },
      ...rutasFacturaElectronica
    ],
  }
]

export default layoutPrivado
