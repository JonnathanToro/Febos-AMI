export default {
  titulo: 'Documetos recibidos',
  campos: ['IndicadorEstadoComercial', 'NCND', 'Documento', 'EstadoPago', 'Plazo', 'RecepcionSii', 'RecepcionFebos'],
  // acccionesIndividuales:['Bitacora','EnviarAprobacion','VerReferencias',
  // 'AsociarDocumento','DescargarPdf','DescargarXml','EnviarDte',
  // 'RecuperarCorreoSii','ModificarTipoVenta','CopiarDocumento','AyudaEnDocumento'],
  acccionesIndividuales: ['Bitacora', /* 'EnviarAprobacion', */'VerReferencias', /* 'AsociarDocumento', */
    'DescargarAmbosPdf', 'DescargarXml', /* 'GestionComercial', */ 'InformacionPago',
    'VerAnotacionesSii', 'EnviarDte', /* 'AsociarContacto', */ 'ModificarTipoCompra'/* , 'GenerarTicketAyuda' */],
  accionesMasivas: [],
  seleccionMasiva: true,
  categoria: 'recibidos',
  filtrosFijos: [
    { campo: 'incompleto', valor: 'N' },
    // TODO find a better way
    // eslint-disable-next-line no-template-curly-in-string
    { campo: 'rutReceptor', valor: '${iutEmpresa}' }
  ],
  filtrosPorDefecto: [
    { campo: 'tipoDocumento', tipo: 'multi', valor: [33, 34, 43, 46, 56, 61, 110, 111, 112] },
    { campo: 'estadoSii', tipo: 'multi', valor: [4, 5] }
  ],
  filtrosHabilitados: [
    { campo: 'fechaCreacion', tipo: 'rangoFecha' },
    { campo: 'folio', tipo: 'listaNumeros' },
    {
      campo: 'estadoSii',
      tipo: 'multi',
      opciones: [
        { nombre: 'Aceptado', valor: '4' },
        { nombre: 'Aceptado 5', valor: '5' }
      ]
    },
    {
      campo: 'tipoDocumento',
      tipo: 'multi',
      opciones: [
        { valor: '33', nombre: 'Facturas Afectas' },
        { valor: '34', nombre: 'Facturas Exentas' },
        { valor: '43', nombre: 'Liquidaciónes de Factura' },
        { valor: '46', nombre: 'Facturas de Compra' },
        { valor: '52', nombre: 'Guías de Despacho' },
        { valor: '56', nombre: 'Notas de Débito' },
        { valor: '61', nombre: 'Notas de Crédito' },
        { valor: '110', nombre: 'Facturas de Exportación' },
        { valor: '111', nombre: 'ND de Exportación' },
        { valor: '112', nombre: 'NC de Exportación' },
      ]
    },
  ]
};
