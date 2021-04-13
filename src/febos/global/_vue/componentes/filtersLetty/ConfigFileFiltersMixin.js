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
        nombre: 'Tipo Expediente',
        campo: 'claseMercadoPublico', // tipo de expedient
        tipo: 'multi',
        valor: [],
        opciones: {
          numInt: 'Numeración interna',
          numOf: 'Numeración oficial',
          ext: 'Externo',
          int: 'Interno'
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
        nombre: 'Observacion / Materia', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Tipo Documento', campo: 'tiposDocumentos', tipo: 'opcionDoc' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del destino', campo: 'destinoListaCodigoUnidad', tipo: 'grupoDestino' }
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
        nombre: 'Tipo Expediente',
        campo: 'claseMercadoPublico', // tipo de expedient
        tipo: 'multi',
        valor: [],
        opciones: {
          numInt: 'Numeración interna',
          numOf: 'Numeración oficial',
          ext: 'Externo',
          int: 'Interno'
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
        nombre: 'textoObservaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'tiposDocumentos', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' },
      { nombre: 'Unidad del destino', campo: 'destinoListaCodigoUnidad', tipo: 'grupoDestino' }
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
        nombre: 'Tipo Expediente',
        campo: 'claseMercadoPublico', // tipo de expedient
        tipo: 'multi',
        valor: [],
        opciones: {
          numInt: 'Numeración interna',
          numOf: 'Numeración oficial',
          ext: 'Externo',
          int: 'Interno'
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
        nombre: 'textoObservaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'tiposDocumentos', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' },
      { nombre: 'Unidad del destino', campo: 'destinoListaCodigoUnidad', tipo: 'grupoDestino' }
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
        nombre: 'Tipo Expediente',
        campo: 'claseMercadoPublico', // tipo de expedient
        tipo: 'multi',
        valor: [],
        opciones: {
          numInt: 'Numeración interna',
          numOf: 'Numeración oficial',
          ext: 'Externo',
          int: 'Interno'
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
        nombre: 'textoObservaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo Documento', campo: 'tiposDocumentos', tipo: 'opcionDoc' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' },
      { nombre: 'Unidad del destino', campo: 'destinoListaCodigoUnidad', tipo: 'grupoDestino' }
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
        nombre: 'Tipo Expediente',
        campo: 'claseMercadoPublico', // tipo de expedient
        tipo: 'multi',
        valor: [],
        opciones: {
          numInt: 'Numeración interna',
          numOf: 'Numeración oficial',
          ext: 'Externo',
          int: 'Interno'
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
        nombre: 'textoObservaciones', campo: 'textoObservaciones', tipo: 'texto', valor: []
      },
      {
        nombre: 'Destino tipo correo', campo: 'destinoCorreoIds', tipo: 'texto', valor: []
      },
      { nombre: 'Derivado por', campo: 'codigosDerivacionUsuario', tipo: 'derivadoIds' },
      { nombre: 'Tipo institución', campo: 'compradorCodigo', tipo: 'opcionInst' },
      { nombre: 'Tipo Documento', campo: 'tiposDocumentos', tipo: 'opcionDoc' },
      { nombre: 'Destino tipo usuario', campo: 'destinoParticipanteIds', tipo: 'usuarioIds' },
      { nombre: 'Destino tipo grupo', campo: 'destinoParticipanteIds', tipo: 'grupoIds' },
      { nombre: 'Usuario creador', campo: 'solicitanteEmail', tipo: 'correos' },
      { nombre: 'Unidad del creador', campo: 'solicitanteGrupoId', tipo: 'grupoCreador' },
      { nombre: 'Unidad del destino', campo: 'destinoListaCodigoUnidad', tipo: 'grupoDestino' }
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
