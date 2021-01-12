import rutasFacturaElectronica from './rutasFacturaElectronica';
import rutasHerramientas from './rutasHerramientas';
import rutasDnts from './rutasDnts';
import templateRoutes from './templateRoutes';

export default [
  {
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        name: 'inicio',
        meta: { permiso: 'WB001', requiereLogin: true },
        component: () => import('@/febos/global/inicio/vistas/Inicio.vue')
      },
      {
        path: '/usuario/perfil',
        name: 'Perfil de Usuario',
        meta: { permiso: 'WB001', requiereLogin: true },
        component: () => import('@/febos/global/usuario/vistas/perfil/Perfil.vue')
      },
      {
        path: '/configuraciones/empresa',
        name: 'Perfil de Empresa',
        meta: { permiso: 'WB001', requiereLogin: true },
        component: () => import('@/febos/global/empresas/vistas/perfilEmpresa.vue')
      },
      {
        path: '/configuraciones/usuarios',
        name: 'Configuración de usuarios',
        meta: { permiso: 'WB001', requiereLogin: true },
        component: () => import('@/febos/global/empresas/vistas/gestUsuarios.vue')
      },
      {
        path: '/configuraciones/cafs',
        name: 'Gestión de CAFs',
        meta: { permiso: 'WB001', requiereLogin: true },
        component: () => import('@/febos/global/empresas/vistas/gestCAFs.vue')
      },
      {
        path: '/page2',
        name: 'page-2',
        meta: { permiso: 'WB002', requiereLogin: true },
        component: () => import('@/views/Page2.vue')
      },
      ...rutasFacturaElectronica,
      ...rutasHerramientas,
      ...rutasDnts,
      ...templateRoutes
    ],
  }
];
