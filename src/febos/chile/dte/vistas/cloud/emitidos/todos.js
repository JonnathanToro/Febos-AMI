export default {
  titulo: 'Documentos emitidos',
  campos: ['EstadosEmision', 'MontoTotal', 'Documento', 'TrackId', 'FechaEnvioSii', 'FechaEmision'],
  acccionesIndividuales: ['Bitacora', 'EnviarAprobacion', 'VerReferencias', 'AsociarDocumento', 'DescargarPdf', 'DescargarXml', 'EnviarDte', 'RecuperarCorreoSii', 'ModificarTipoVenta', 'CopiarDocumento', 'AyudaEnDocumento'],
  accionesMasivas: [],
  seleccionMasiva: true,
  categoria: 'emitidos',
  filtrosFijos: [
    {campo: 'incompleto', valor: 'N'}
  ],
  filtrosPorDefecto: [
    {campo: 'tipoDocumento', valor: [33, 34, 43, 46, 56, 61, 110, 111, 112]},
    {campo: 'estadoSii', valor: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
  ],
  filtrosVariables: ["fechaEmision","folio","estadoSii"]
}
