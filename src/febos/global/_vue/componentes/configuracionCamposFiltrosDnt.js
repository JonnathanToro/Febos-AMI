export default {
  emisorRut: {
    nombre: 'RUT Emisor',
    tipo: 'rut'
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
  destinoCodigo: { // tipos de destinos
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
  }
};
