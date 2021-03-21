/*
posibles tipos:
- multi
- selector
- listaNumeros
- fecha
- rangoFecha
 */

export default {
  titulo: 'Documentos emitidos',
  campos: ['EstadosEmision', 'MontoTotal', 'Documento', 'TrackId', 'FechaEnvioSii', 'FechaEmision'],
  acccionesIndividuales: ['Bitacora', 'VerReferencias', 'DescargarAmbosPdf', 'DescargarXml', 'DescargarAec', 'CertificadoCesion', 'InformacionPago', 'AnularDocumento', 'ConsultarEstadoSii', 'VerAnotacionesSii', 'EnviarDte', 'ReenviarSii', 'Ceder', 'ModificarTipoVenta', 'CopiarDocumento'],
  // acccionesIndividuales: ['DescargarPdf'],
  accionesMasivas: [],
  seleccionMasiva: true,
  categoria: 'emitidos',
  filtrosFijos: [
    { campo: 'incompleto', valor: 'N' },
    { campo: 'rutEmisor', valor: '${iutEmpresa}' }
  ],
  filtrosPorDefecto: [
    { campo: 'tipoDocumento', tipo: 'multi', valor: [33, 34, 61, 52, 43, 56] },
    { campo: 'estadoSii', tipo: 'multi', valor: [1, 2, 3, 4, 5, 6, 9] },
  ],
  filtrosHabilitados: [
    { campo: 'fechaEmision', tipo: 'rangoFecha' },
    { campo: 'folio', tipo: 'numero' },
    { campo: 'rutReceptor', tipo: 'rut' },
    {
      campo: 'estadoSii',
      tipo: 'multi',
      opciones: [
      // {nombre:'Creado',valor:'0'},
        { nombre: 'Pendiente de Envío', valor: '1' },
        { nombre: 'Enviado', valor: '2' },
        { nombre: 'Error al enviar', valor: '3' },
        { nombre: 'Aceptado', valor: '4' },
        { nombre: 'Aceptado con reparos', valor: '5' },
        { nombre: 'Rechazado', valor: '6' },
        // {nombre:'Pendiente de consulta',valor:'7'},
        // {nombre:'Error al consultar',valor:'8'},
        { nombre: 'Ensobrado', valor: '9' },
      // {nombre:'Anulado',valor:'10'},
      // {nombre:'Pendiente validación',valor:'20'},
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
    {
      campo: 'estadoComercial',
      tipo: 'multi',
      opciones: [
        { valor: '0', nombre: 'Sin acción' },
        { valor: '1', nombre: 'Pre-Aceptado' },
        { valor: '2', nombre: 'Aceptado en el SII' },
        { valor: '3', nombre: 'Pre-Rechazado' },
        { valor: '4', nombre: 'Rechazado en el SII' },
        { valor: '5', nombre: 'Reclamo parcial en el SII' },
        { valor: '6', nombre: 'Reclamo total en el SII' },
        { valor: '7', nombre: 'Recibo de mercaderías en el SII' },
      ]
    },
  ]
};
