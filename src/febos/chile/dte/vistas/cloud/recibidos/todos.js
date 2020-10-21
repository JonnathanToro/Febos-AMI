export default {
  titulo:'Documetos recibidos',
  campos:['IndicadorEstadoComercial', 'NCND', 'Documento', 'EstadoPago', 'Plazo', 'RecepcionSii', 'RecepcionFebos'],
  //acccionesIndividuales:['Bitacora','EnviarAprobacion','VerReferencias','AsociarDocumento','DescargarPdf','DescargarXml','EnviarDte','RecuperarCorreoSii','ModificarTipoVenta','CopiarDocumento','AyudaEnDocumento'],
  acccionesIndividuales: ['Bitacora', 'EnviarAprobacion'/*, 'VerReferencias', 'AsociarDocumento', 'DescargarAmbosPdf', 'DescargarXml', 'GestionComercial', 'InformacionPago', 'VerAnotacionesSii', 'EnviarDte', 'AsociarContacto', 'ModificarTipoCompra', 'GenerarTicketAyuda'*/],
  accionesMasivas:[],
  seleccionMasiva:true,
  categoria: 'recibidos',
  filtrosFijos: [
    {campo: 'incompleto', valor: 'N'}
  ],
  filtrosPorDefecto: [
    {campo: 'tipoDocumento', tipo:'multi',valor: [33,34,61,52,43,56]},
    {campo: 'estadoSii', tipo:'multi', valor: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
    {campo: 'fechaEmision', tipo:'multi', valor: 'ultimas3semanas'}
  ],
  filtrosHabilitados: [
    {campo: 'fechaEmision', tipo:'rangoFecha'},
    {campo: 'folio', tipo:'listaNumeros'},
    {campo: 'estadoSii', tipo:'multi',opciones:[
        {nombre:'Creado',valor:'0'},
        {nombre:'Pendiente de Envio',valor:'1'},
        {nombre:'Enviado',valor:'2'},
        {nombre:'Error al enviar',valor:'3'},
        {nombre:'Aceptado',valor:'4'},
        {nombre:'Aceptado 5',valor:'5'},
        {nombre:'Aceptado 6',valor:'6'},
        {nombre:'Aceptado 7',valor:'7'},
        {nombre:'Aceptado 8',valor:'8'},
        {nombre:'Aceptado 9',valor:'9'},
      ]},
    {campo: 'tipoDocumento', tipo:'multi',opciones:[
        {valor:'33',nombre:'Facturas Afectas'},
        {valor:'34',nombre:'Facturas Exentas'},
        {valor:'43',nombre:'Liquidaciónes de Factura'},
        {valor:'46',nombre:'Facturas de Compra'},
        {valor:'52',nombre:'Guías de Despacho'},
        {valor:'56',nombre:'Notas de Débito'},
        {valor:'61',nombre:'Notas de Crédito'},
        {valor:'110',nombre:'Facturas de Exportación'},
        {valor:'111',nombre:'ND de Exportación'},
        {valor:'112',nombre:'NC de Exportación'},
      ]},
  ]
}
