/*
{
  nombre: 'aprobaciones',
  descripcion: 'Aprobaciones',
  tooltip: '',
  icono: 'done_all',
  habilitado: true,
  visible: true
},
{
  nombre: 'escritorioDigital',
  descripcion: 'Escritorio Digital',
  tooltip: '',
  icono: 'all_inbox',
  habilitado: false,
  visible: true
},
{
  nombre: 'compras',
  descripcion: 'Gestión de Compras',
  tooltip: '',
  icono: 'shopping_cart',
  habilitado: false,
  visible: true
},
{
  nombre: 'contratos',
  descripcion: 'Gestión de Contratos',
  tooltip: '',
  icono: 'supervisor_account',
  habilitado: false,
  visible: true
},
{
  nombre: 'gastos',
  descripcion: 'Rendición de Gastos',
  tooltip: '',
  icono: 'receipt',
  habilitado: false,
  visible: true
},
{
  nombre: 'partners',
  descripcion: 'Partners',
  tooltip: '',
  icono: 'widgets',
  habilitado: false,
  visible: true
},
{
  nombre: 'configuracion',
  descripcion: 'Configuración',
  tooltip: '',
  icono: 'settings',
  habilitado: false,
  visible: true
}
*/

const moduleSettings = {
  narvi: [
    {
      nombre: 'facturaElectronica',
      descripcion: 'Factura Electrónica',
      tooltip: '',
      icono: 'description',
      habilitado: true,
      visible: true
    }
  ],
  febos: [],
  ed: [
    {
      nombre: 'herramientas',
      descripcion: 'Herramientas',
      tooltip: '',
      icono: 'settings',
      habilitado: true,
      visible: true
    },
    {
      nombre: 'templates',
      descripcion: 'Plantillas',
      tooltip: '',
      icono: 'description',
      habilitado: true,
      visible: true
    }
  ]
};

export default {
  data() {
    return {
      modules: moduleSettings[process.env.VUE_APP_PRODUCTO]
    };
  }
};
