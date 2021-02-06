const observaciones = [
  'esta es la materia',
  'esta es la observacion'
];

const etiquetas = [];

const dnt = {
  emisorRut: '26066368-2', // rut empresa y razon en el campo emisorRazonSocial
  receptorRut: '26066368-2', // rut empresa  y razon en el campo receptorRazonSocial
  claseMercadoPublico: 'ext', // documento externo o interno (ext-int)
  // estado: 3 se envia si se crea un borrador

  emisorCentroCostoNumero: 'CERT', // tipo documento
  emisorCentroCostoNombre: 'Certificado', // nombre tipo documento
  emisorSucursalCodigo: 'CERT01', // documento
  emisorSucursalDireccion: 'Certificado de documentos', // nombre documento
  fechaEmision: '2020-01-20', // fecha documento
  materia: observaciones[0], // materia
  transportePuertoTipo: '1', // documnto privado (1 si - 0 no),
  compradorCodigo: 'INST', // tipo de institucion
  compradorArea: 'Tipo Institución nombre', // nombre de tipo institucion
  emisorContactoCodigo: 'INST01', // institucion
  emisorContactoArea: 'Institucion nombre', // nombre de institucion
  emisorContactoNombre: 'Letty Villamizar', // nombre persona
  emisorContactoCargo: 'Desarrolladora', // cargo persona
  transporteViaTransporteCodigoTransporte: '1', // acompaña fisico (1 si - 0 no)
  observacion: observaciones[1] // observacion
};

const destinos = {
  tipoDestino: '1', // tipo de destino (1 destinatario - 1 copia)
  estado: 1, // campo que puede usarse en un futuro o se puede usar para ver si esta marcado o no
  destinoCodigo: 'usuarios', // tipo destino (usuarios, grupos, docDigital, ministerios, empresas)
  destinoNombre: 'Usuarios', // nombre tipo destino
  destinoListaCodigo: 'letty@febos.cl', // valor del select, es id o correo
  destinoListaNombre: 'Letty Villamizar', // nombre de lo que selecciono
  // si es doc digital
  institucionCodigo: 'inst', // codigo de institucion
  institucionNombre: 'Nombre institucion doc digital', // nombre de institucion doc digital
  destinoCorreo: '' // correo al que se enviara la informacion por correo
};

const copias = {
  tipoDestino: '2', // tipo de destino (1 destinatario - 1 copia)
  estado: 1, // campo que puede usarse en un futuro o se puede usar para ver si esta marcado o no
  destinoCodigo: 'usuarios', // tipo destino (usuarios, grupos, docDigital, ministerios, empresas)
  destinoNombre: 'Usuarios', // nombre tipo destino
  destinoListaCodigo: 'letty@febos.cl', // valor del select, es id o correo
  destinoListaNombre: 'Letty Villamizar', // nombre de lo que selecciono
  // si es doc digital
  institucionCodigo: 'inst', // codigo de institucion
  institucionNombre: 'Nombre institucion doc digital', // nombre de institucion doc digital
  destinoCorreo: '' // correo al que se enviara la informacion por correo
};

const adjuntos = [
  {
    tipo: 'principal', // si el archivo es el principal
    adjuntoMime: 'pdf', // mime del archivo
    adjuntoNombre: 'test.pdf', // nombre del archivo
    fecha: '2020-01-23', // fecha en la que se sube
    adjuntoUrl: 'werwrwr' // url obtenida con la directiva
  },
  {
    tipo: 'adjunto', // si el archivo es adjunto
    adjuntoMime: 'pdf', // mime del archivo
    adjuntoNombre: 'test1.pdf', // nombre del archivo
    fecha: '2020-01-23', // fecha en la que se sube
    adjuntoUrl: 'werwrwr' // url obtenida con la directiva
  },
  {
    tipo: 'adjunto', // si el archivo es adjunto
    adjuntoMime: 'pdf', // mime del archivo
    adjuntoNombre: 'test2.pdf', // nombre del archivo
    fecha: '2020-01-23', // fecha en la que se sube
    adjuntoUrl: 'werwrwr' // url obtenida con la directiva
  }
];

const referencias = [
  {
    linea: 1, // se incrementa por cada referencia nueva
    tipoDocumento: 'SSD', // Expediente, Contrato SAFI, Proceso SSD
    razon: 'Proceso SSD', // nombre de tipo documento
    folio: '23' // numero de documento
  }
];

const request = {
  dnt,
  dntEtiqueta: etiquetas,
  dntDestino: destinos.concat(copias),
  dntAdjuntos: adjuntos,
  dntReferencias: referencias
};
console.log('request', request);
