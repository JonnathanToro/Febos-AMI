export default {
  emisorRut: {
    nombre: 'RUT Emisor',
    tipo: 'rut'
  },
  destinoResponsableIds: {
    nombre: 'Destinatario/Responsable',
    tipo: 'texto'
  },
  destinoParticipanteIds: {
    nombre: 'Destinatario/Responsable',
    tipo: 'texto'
  },
  fechaEmision: {
    nombre: 'Fecha de Emisión',
    tipo: 'fecha'
  },
  fechaCreacion: {
    nombre: 'Fecha de Creación',
    tipo: 'fecha'
  },
  numero: {
    nombre: 'Numero',
    tipo: 'numero'
  },
  estado: {
    nombre: 'Estado de expedientes',
    tipo: 'multi'
  },
  destinoCopiaIds: {
    nombre: 'Esta en copia',
    tipo: 'destinoCopiaIds'
  },
  tipo: {
    nombre: 'Tipo de expedientes',
    tipo: 'multi'
  },
  emisorCentroCostoNumero: { // tipo de documento
    nombre: 'Tipo de documento',
    tipo: 'tipoDocumento'
  },
  /*
  emisorSucursalDireccion: { // nombre documento
    nombre: 'Documento',
    tipo: 'documento'
  },
  */
  transportePuertoTipo: { // es privado
    nombre: 'Es privado',
    tipo: 'multi'
  },
  compradorCodigo: { // tipo de institucion
    nombre: 'Tipo de institución',
    tipo: 'tipoIntitucion'
  },
  /*
  emisorContactoArea: { // nombre de institucion
    nombre: 'Institución',
    tipo: 'nombreInstitucion'
  },
  */
  emisorContactoNombre: { // nombre de persona remitente
    nombre: 'Nombre persona remitente',
    tipo: 'texto'
  },
  emisorContactoCargo: { // nombre de persona remitente
    nombre: 'Cargo persona remitente',
    tipo: 'texto'
  },
  transporteViaTransporteCodigoTransporte: { // acompaña fisico
    nombre: 'Acompaña físico',
    tipo: 'multi'
  },
  destinoCodigoIds: { // tipos de destinos
    nombre: 'Tipo de destino',
    tipo: 'multi'
  },
  destinoUsuarios: { // tipos de destinos
    nombre: 'Destino tipo usuario',
    tipo: 'destinoUsuarios'
  },
  destinoGrupos: { // tipos de destinos
    nombre: 'Destino tipo grupo',
    tipo: 'destinoGrupos'
  },
  destinoCorreos: { // tipos de destinos
    nombre: 'Destino Correo',
    tipo: 'destinoCorreos'
  },
  referenciaTipo: {
    nombre: 'Tipo de referencia', // tipo de referencia
    tipo: 'referenciaTipo'
  },
  solicitanteCorreo: {
    nombre: 'Usuario creador',
    tipo: 'solicitanteCorreo'
  },
  codigosEtiqueta: {
    nombre: 'Etiquetas',
    tipo: 'texto'
  },
  textoObservaciones: {
    nombre: 'Observaciones/Materia',
    tipo: 'texto'
  }
};
