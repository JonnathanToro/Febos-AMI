const filterViews = {
  borradores: {
    filtrosFijos: [
      {
        nombre: 'Rut emisor',
        campo: 'emisorRut',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${iutEmpresa}'
      },
      {
        nombre: 'Responsable',
        campo: 'destinoResponsableIds',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${idUsuario}'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        // eslint-disable-next-line no-template-curly-in-string
        opciones: {
          int: 'Interno',
          ext: 'Externo',
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          3: 'Borrador'
        }
      },
    ],
    filtrosHabilitados: [
      {
        nombre: 'Núm Exp.', campo: 'numero', tipo: 'texto', valor: []
      },
      {
        nombre: 'Núm Doc.', campo: 'numeroInt', tipo: 'texto', valor: []
      },
      {
        nombre: 'Es privado',
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Documento privado',
          0: 'Documento público'
        }
      },
      {
        nombre: 'Acompaña físico',
        campo: 'transporteViaTransporteCodigoTransporte',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Acompaña físico',
          0: 'No Acompaña físico'
        }
      },
      {
        nombre: 'Tipo de destino',
        campo: 'destinoCodigoIds',
        tipo: 'multi',
        valor: [],
        opciones: {
          usuarios: 'Funcionarios',
          unidades: 'Unidades',
          oficinas: 'Oficinas',
          docDigital: 'DocDigital',
          ministerios: 'Ministerios',
          empresas: 'Empresas',
          personas: 'Personas'
        }
      },
      {
        nombre: 'Tipo de referencia',
        campo: 'codigosReferenciasTipos',
        tipo: 'multi',
        valor: [],
        opciones: {
          EXP: 'Expediente',
          SSD: 'Proceso SSD'
        }
      },
      {
        nombre: 'Fecha documento', campo: 'fechaEmision', tipo: 'fecha', valor: ''
      },
      {
        nombre: 'Nombre remitente', campo: 'emisorContactoNombre', tipo: 'texto', valor: []
      },
      {
        nombre: 'Nº Contrato SAFI', campo: 'transportePuertoCodigo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Cargo remitente', campo: 'emisorContactoCargo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Correo remitente', campo: 'emisorContactoEmail', tipo: 'texto', valor: []
      },
      {
        nombre: 'Etiquetas', campo: 'codigosEtiqueta', tipo: 'texto', valor: []
      },
      {
        nombre: 'Observaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Tipo Documento', campo: 'emisorCentroCostoNumero', tipo: 'opcionDoc' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' }

    ]
  },
  pendientes: {
    filtrosFijos: [
      {
        // eslint-disable-next-line no-template-curly-in-string
        nombre: 'Rut emisor', campo: 'emisorRut', tipo: 'text', valor: '${iutEmpresa}'
      },
      {
        nombre: 'Responsable',
        campo: 'destinoResponsableIds',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${idUsuario}'
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        opciones: {
          int: 'Interno',
          ext: 'Externo',
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          1: 'Creado'
        }
      }
    ],
    filtrosHabilitados: [
      {
        nombre: 'Fecha documento', campo: 'fechaEmision', tipo: 'fecha', valor: ''
      },
      {
        nombre: 'Núm Exp.', campo: 'numero', tipo: 'texto', valor: []
      },
      {
        nombre: 'Núm Doc.', campo: 'numeroInt', tipo: 'texto', valor: []
      },
      {
        nombre: 'Es privado',
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Documento privado',
          0: 'Documento público'
        }
      },
      {
        nombre: 'Acompaña físico',
        campo: 'transporteViaTransporteCodigoTransporte',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Acompaña físico',
          0: 'No Acompaña físico'
        }
      },
      {
        nombre: 'Tipo de destino',
        campo: 'destinoCodigoIds',
        tipo: 'multi',
        valor: [],
        opciones: {
          usuarios: 'Funcionarios',
          unidades: 'Unidades',
          oficinas: 'Oficinas',
          docDigital: 'DocDigital',
          ministerios: 'Ministerios',
          empresas: 'Empresas',
          personas: 'Personas'
        }
      },
      {
        nombre: 'Tipo de referencia',
        campo: 'codigosReferenciasTipos',
        tipo: 'multi',
        valor: [],
        opciones: {
          EXP: 'Expediente',
          SSD: 'Proceso SSD'
        }
      },
      {
        nombre: 'Nº Contrato SAFI', campo: 'transportePuertoCodigo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Nombre remitente', campo: 'emisorContactoNombre', tipo: 'texto', valor: []
      },
      {
        nombre: 'Cargo remitente', campo: 'emisorContactoCargo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Correo remitente', campo: 'emisorContactoEmail', tipo: 'texto', valor: []
      },
      {
        nombre: 'Etiquetas', campo: 'codigosEtiqueta', tipo: 'texto', valor: []
      },
      {
        nombre: 'Observaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'emisorCentroCostoNumero', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' }
    ]
  },
  tramitados: {
    filtrosFijos: [
      {
        // eslint-disable-next-line no-template-curly-in-string
        nombre: 'Rut emisor', campo: 'emisorRut', tipo: 'text', valor: '${iutEmpresa}'
      },
      {
        nombre: 'Responsable',
        campo: 'destinoResponsableIds',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${idUsuario}'
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        opciones: {
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          10: 'Tramitado'
        }
      }
    ],
    filtrosHabilitados: [
      {
        nombre: 'Fecha documento', campo: 'fechaEmision', tipo: 'fecha', valor: ''
      },
      {
        nombre: 'Núm Exp.', campo: 'numero', tipo: 'texto', valor: []
      },
      {
        nombre: 'Núm Doc.', campo: 'numeroInt', tipo: 'texto', valor: []
      },
      {
        nombre: 'Es privado',
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Documento privado',
          0: 'Documento público'
        }
      },
      {
        nombre: 'Acompaña físico',
        campo: 'transporteViaTransporteCodigoTransporte',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Acompaña físico',
          0: 'No Acompaña físico'
        }
      },
      {
        nombre: 'Tipo de destino',
        campo: 'destinoCodigoIds',
        tipo: 'multi',
        valor: [],
        opciones: {
          usuarios: 'Funcionarios',
          unidades: 'Unidades',
          oficinas: 'Oficinas',
          docDigital: 'DocDigital',
          ministerios: 'Ministerios',
          empresas: 'Empresas',
          personas: 'Personas'
        }
      },
      {
        nombre: 'Tipo de referencia',
        campo: 'codigosReferenciasTipos',
        tipo: 'multi',
        valor: [],
        opciones: {
          EXP: 'Expediente',
          SSD: 'Proceso SSD'
        }
      },
      {
        nombre: 'Nº Contrato SAFI', campo: 'transportePuertoCodigo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Nombre remitente', campo: 'emisorContactoNombre', tipo: 'texto', valor: []
      },
      {
        nombre: 'Cargo remitente', campo: 'emisorContactoCargo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Correo remitente', campo: 'emisorContactoEmail', tipo: 'texto', valor: []
      },
      {
        nombre: 'Etiquetas', campo: 'codigosEtiqueta', tipo: 'texto', valor: []
      },
      {
        nombre: 'Observaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'emisorCentroCostoNumero', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' }
    ]
  },
  finalizados: {
    filtrosFijos: [
      {
        // eslint-disable-next-line no-template-curly-in-string
        nombre: 'Rut emisor', campo: 'emisorRut', tipo: 'text', valor: '${iutEmpresa}'
      },
      {
        nombre: 'Responsable',
        campo: 'destinoResponsableIds',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${idUsuario}'
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        opciones: {
          int: 'Interno',
          ext: 'Externo',
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          8: 'Anulado',
          9: 'Finalizado'
        }
      }
    ],
    filtrosHabilitados: [
      {
        nombre: 'Fecha documento', campo: 'fechaEmision', tipo: 'fecha', valor: ''
      },
      {
        nombre: 'Núm Exp.', campo: 'numero', tipo: 'texto', valor: []
      },
      {
        nombre: 'Núm Doc.', campo: 'numeroInt', tipo: 'texto', valor: []
      },
      {
        nombre: 'Es privado',
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Documento privado',
          0: 'Documento público'
        }
      },
      {
        nombre: 'Acompaña físico',
        campo: 'transporteViaTransporteCodigoTransporte',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Acompaña físico',
          0: 'No Acompaña físico'
        }
      },
      {
        nombre: 'Tipo de destino',
        campo: 'destinoCodigoIds',
        tipo: 'multi',
        valor: [],
        opciones: {
          usuarios: 'Funcionarios',
          unidades: 'Unidades',
          oficinas: 'Oficinas',
          docDigital: 'DocDigital',
          ministerios: 'Ministerios',
          empresas: 'Empresas',
          personas: 'Personas'
        }
      },
      {
        nombre: 'Tipo de referencia',
        campo: 'codigosReferenciasTipos',
        tipo: 'multi',
        valor: [],
        opciones: {
          EXP: 'Expediente',
          SSD: 'Proceso SSD'
        }
      },
      {
        nombre: 'Nº Contrato SAFI', campo: 'transportePuertoCodigo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Nombre remitente', campo: 'emisorContactoNombre', tipo: 'texto', valor: []
      },
      {
        nombre: 'Cargo remitente', campo: 'emisorContactoCargo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Correo remitente', campo: 'emisorContactoEmail', tipo: 'texto', valor: []
      },
      {
        nombre: 'Etiquetas', campo: 'codigosEtiqueta', tipo: 'texto', valor: []
      },
      {
        nombre: 'Observaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'emisorCentroCostoNumero', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' }
    ]
  },
  general: {
    filtrosFijos: [
      {
        nombre: 'Rut emisor',
        campo: 'emisorRut',
        tipo: 'text',
        // eslint-disable-next-line no-template-curly-in-string
        valor: '${iutEmpresa}'
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        // eslint-disable-next-line no-template-curly-in-string
        opciones: {
          int: 'Interno',
          ext: 'Externo',
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          1: 'En curso',
          8: 'Anulado',
          9: 'Finalizado'
        }
      }
    ],
    filtrosHabilitados: [
      {
        nombre: 'Núm Exp.', campo: 'numero', tipo: 'texto', valor: []
      },
      {
        nombre: 'Núm Doc.', campo: 'numeroInt', tipo: 'texto', valor: []
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'En curso',
          3: 'Borrador',
          8: 'Anulado',
          9: 'Finalizado'
        }
      },
      {
        nombre: 'Es privado',
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Documento privado',
          0: 'Documento público'
        }
      },
      {
        nombre: 'Acompaña físico',
        campo: 'transporteViaTransporteCodigoTransporte',
        tipo: 'multi',
        valor: [],
        opciones: {
          1: 'Acompaña físico',
          0: 'No Acompaña físico'
        }
      },
      {
        nombre: 'Tipo de destino',
        campo: 'destinoCodigoIds',
        tipo: 'multi',
        valor: [],
        opciones: {
          usuarios: 'Funcionarios',
          unidades: 'Unidades',
          oficinas: 'Oficinas',
          docDigital: 'DocDigital',
          ministerios: 'Ministerios',
          empresas: 'Empresas',
          personas: 'Personas'
        }
      },
      {
        nombre: 'Tipo de referencia',
        campo: 'codigosReferenciasTipos',
        tipo: 'multi',
        valor: [],
        opciones: {
          EXP: 'Expediente',
          SSD: 'Proceso SSD'
        }
      },
      {
        nombre: 'Nº Contrato SAFI', campo: 'transportePuertoCodigo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Fecha documento', campo: 'fechaEmision', tipo: 'fecha', valor: ''
      },
      {
        nombre: 'Nombre remitente', campo: 'emisorContactoNombre', tipo: 'texto', valor: []
      },
      {
        nombre: 'Cargo remitente', campo: 'emisorContactoCargo', tipo: 'texto', valor: []
      },
      {
        nombre: 'Correo remitente', campo: 'emisorContactoEmail', tipo: 'texto', valor: []
      },
      {
        nombre: 'Etiquetas', campo: 'codigosEtiqueta', tipo: 'texto', valor: []
      },
      {
        nombre: 'Observaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Tipo Documento', campo: 'emisorCentroCostoNumero', tipo: 'opcionDoc' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' }
    ]
  },
  compartido: {
    filtrosFijos: [
      {
        // eslint-disable-next-line no-template-curly-in-string
        nombre: 'Rut emisor', campo: 'emisorRut', tipo: 'text', valor: '${iutEmpresa}'
      },
      {
        nombre: 'Tipo',
        campo: 'tipo',
        tipo: 'text',
        valor: 'EXP'
      },
      {
        nombre: 'Tipo expediente',
        campo: 'claseMercadoPublico',
        tipo: 'multi',
        opciones: {
          int: 'Interno',
          ext: 'Externo',
          numInt: 'Num. Interno',
          numOf: 'Num. Oficial'
        }
      },
      {
        nombre: 'Estado',
        campo: 'estado',
        tipo: 'multi',
        opciones: {
          1: 'Creado'
        }
      }
    ],
    filtrosHabilitados: []
  }

  /*
  emisorRut: {
    nombre: 'RUT Emisor',
    tipo: 'rut'
  },
  destinoResponsableIds: {
    nombre: 'Destinatario/Responsable',
    tipo: 'texto'
  },
  claseMercadoPublico: {
    nombre: 'Tipo entrada',
    tipo: 'multi'
  },
  destinoParticipanteIds: {
    nombre: 'Participante',
    tipo: 'texto'
  },
  fechaEmision: {
    nombre: 'Fecha de Documento',
    tipo: 'fecha'
  },
  fechaCreacion: {
    nombre: 'Fecha de Creación',
    tipo: 'fecha'
  },
  numero: {
    nombre: 'Número Expediente',
    tipo: 'numero'
  },
  numeroInt: {
    nombre: 'Número doc.',
    tipo: 'texto'
  },
  estado: {
    nombre: 'Estado',
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
  /!*
  emisorSucursalDireccion: { // nombre documento
    nombre: 'Documento',
    tipo: 'documento'
  },
  *!/
  transportePuertoTipo: { // es privado
    nombre: 'Es privado',
    tipo: 'multi'
  },
  compradorCodigo: { // tipo de institucion
    nombre: 'Tipo de institución',
    tipo: 'tipoIntitucion'
  },
  /!*
  emisorContactoArea: { // nombre de institucion
    nombre: 'Institución',
    tipo: 'nombreInstitucion'
  },
  *!/
  emisorContactoNombre: { // nombre de persona remitente
    nombre: 'Nombre persona remitente',
    tipo: 'texto'
  },
  emisorContactoCargo: { // nombre de persona remitente
    nombre: 'Cargo persona remitente',
    tipo: 'texto'
  },
  emisorContactoEmail: { // tipos de destinos
    nombre: 'Correo remitente',
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
  },
  codigosDerivacionUsuario: {
    nombre: 'Derivado por',
    tipo: 'usuarioIds'
  }
  */
};

export default {
  data() {
    return filterViews;
  },
  methods: {
    getFilterViewLetty(view) {
      return filterViews[view];
    }
  }
};
