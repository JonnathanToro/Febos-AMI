import { mapGetters } from 'vuex';

const filterViews = {
  borradores: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'destinoResponsableIds', valor: '${idUsuario}' },
      // { campo: 'categoria', valor: 'pendiente' },
      { campo: 'tipo', tipo: 'multi', valor: ['EXP'] },
      { campo: 'claseMercadoPublico', tipo: 'multi', valor: ['int', 'ext', 'numInt', 'numOf'] }
    ],
    filtrosPorDefecto: [
      { campo: 'estado', tipo: 'multi', valor: ['3'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      { campo: 'numeroInt', tipo: 'texto' },
      { campo: 'codigosDerivacionUsuario', tipo: 'usuarioIds' },
      { campo: 'emisorCentroCostoNumero', tipo: 'tipoDocumento' }, // tipo de documento
      // { campo: 'emisorSucursalDireccion', tipo: 'documento' }, // documento
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'En curso' },
          { valor: '3', nombre: 'Borrador' },
          { valor: '8', nombre: 'Anulado' },
          { valor: '9', nombre: 'Finalizado' }
        ]
      },
      {
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        opciones: [
          { nombre: 'Documento privado', valor: '1' },
          { nombre: 'Documento público', valor: '0' }
        ]
      },
      { campo: 'compradorCodigo', tipo: 'tipoInstitucion' }, // tipo institucion
      // { campo: 'emisorContactoArea', tipo: 'institucion' }, // nombre institucion
      { campo: 'emisorContactoNombre', tipo: 'texto' }, // nombre remitente
      { campo: 'emisorContactoCargo', tipo: 'texto' }, // cargo remitente
      { campo: 'emisorContactoEmail', tipo: 'texto' }, // correo remitente
      {
        campo: 'transporteViaTransporteCodigoTransporte', // acompaña fisico
        tipo: 'multi',
        opciones: [
          { nombre: 'Acompaña físico', valor: '1' },
          { nombre: 'No acompaña físico', valor: '0' }
        ]
      },
      {
        campo: 'destinoCodigoIds', // tipos de destino
        tipo: 'multi',
        opciones: [
          { nombre: 'Funcionarios', valor: 'usuarios' },
          { nombre: 'Unidades', valor: 'unidades' },
          { nombre: 'Oficinas de partes', valor: 'oficinas' },
          { nombre: 'DocDigital', valor: 'docDigital' },
          { nombre: 'Ministerios', valor: 'ministerios' },
          { nombre: 'Empresas', valor: 'empresas' },
          { nombre: 'Personas', valor: 'personas' }
        ]
      },
      { campo: 'destinoUsuarios', tipo: 'destinoUsuarios' }, // tipo de destino usuarios
      { campo: 'destinoGrupos', tipo: 'destinoGrupos' }, // tipo de destino de grupo
      { campo: 'destinoCorreos', tipo: 'destinoCorreos' }, // tipo de destino de ministerio, persona o empresa
      {
        campo: 'referenciaTipo', // tipos de referencias
        tipo: 'multi',
        opciones: [
          { nombre: 'Expediente', valor: 'expediente' },
          { nombre: 'Contrato SAFI', valor: 'SAFI' },
          { nombre: 'Proceso SSD', valor: 'SSD' }
        ]
      },
      { campo: 'solicitanteCorreo', tipo: 'solicitanteCorreo' }, // correo de usuario que creo el expediente
      { campo: 'codigosEtiqueta', tipo: 'texto' },
      { campo: 'textoObservaciones', tipo: 'texto' }
    ]
  },
  pendientes: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'destinoResponsableIds', valor: '${idUsuario}' },
      // { campo: 'categoria', valor: 'pendiente' },
      { campo: 'tipo', tipo: 'multi', valor: ['EXP'] },
      { campo: 'claseMercadoPublico', tipo: 'multi', valor: ['int', 'ext', 'numInt', 'numOf'] }
    ],
    filtrosPorDefecto: [
      { campo: 'estado', tipo: 'multi', valor: ['1'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      { campo: 'numeroInt', tipo: 'texto' },
      { campo: 'codigosDerivacionUsuario', tipo: 'usuarioIds' },
      /*
      {
        campo: 'tipo',
        tipo: 'multi',
        opciones: [
          { valor: 'EXP', nombre: 'Expedientes' },
          { valor: 'ACRE', nombre: 'Oficina' },
        ]
      },
      */
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'En curso' },
          { valor: '3', nombre: 'Borrador' },
          { valor: '8', nombre: 'Anulado' },
          { valor: '9', nombre: 'Finalizado' }
        ]
      },
      { campo: 'emisorCentroCostoNumero', tipo: 'tipoDocumento' }, // tipo de documento
      // { campo: 'emisorSucursalDireccion', tipo: 'documento' }, // documento
      {
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        opciones: [
          { nombre: 'Documento privado', valor: '1' },
          { nombre: 'Documento público', valor: '0' }
        ]
      },
      { campo: 'compradorCodigo', tipo: 'tipoInstitucion' }, // tipo institucion
      // { campo: 'emisorContactoArea', tipo: 'institucion' }, // nombre institucion
      { campo: 'emisorContactoNombre', tipo: 'texto' }, // nombre remitente
      { campo: 'emisorContactoCargo', tipo: 'texto' }, // cargo remitente
      { campo: 'emisorContactoEmail', tipo: 'texto' }, // correo remitente
      {
        campo: 'transporteViaTransporteCodigoTransporte', // acompaña fisico
        tipo: 'multi',
        opciones: [
          { nombre: 'Acompaña físico', valor: '1' },
          { nombre: 'No acompaña físico', valor: '0' }
        ]
      },
      {
        campo: 'destinoCodigoIds', // tipos de destino
        tipo: 'multi',
        opciones: [
          { nombre: 'Funcionarios', valor: 'usuarios' },
          { nombre: 'Unidades', valor: 'unidades' },
          { nombre: 'Oficinas de partes', valor: 'oficinas' },
          { nombre: 'DocDigital', valor: 'docDigital' },
          { nombre: 'Ministerios', valor: 'ministerios' },
          { nombre: 'Empresas', valor: 'empresas' },
          { nombre: 'Personas', valor: 'personas' }
        ]
      },
      { campo: 'destinoUsuarios', tipo: 'destinoUsuarios' }, // tipo de destino usuarios
      { campo: 'destinoGrupos', tipo: 'destinoGrupos' }, // tipo de destino de grupo
      { campo: 'destinoCorreos', tipo: 'destinoCorreos' }, // tipo de destino de ministerio, persona o empresa
      {
        campo: 'referenciaTipo', // tipos de referencias
        tipo: 'multi',
        opciones: [
          { nombre: 'Expediente', valor: 'expediente' },
          { nombre: 'Contrato SAFI', valor: 'SAFI' },
          { nombre: 'Proceso SSD', valor: 'SSD' }
        ]
      },
      { campo: 'solicitanteCorreo', tipo: 'solicitanteCorreo' }, // correo de usuario que creo el expediente
      { campo: 'codigosEtiqueta', tipo: 'texto' },
      { campo: 'textoObservaciones', tipo: 'texto' }
    ]
  },
  general: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      { campo: 'tipo', tipo: 'multi', valor: ['EXP'] },
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'claseMercadoPublico', tipo: 'multi', valor: ['int', 'ext', 'numInt', 'numOf'] }
    ],
    filtrosPorDefecto: [
      { campo: 'estado', tipo: 'multi', valor: ['1', '8', '9'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      { campo: 'numeroInt', tipo: 'texto' },
      /*
      {
        campo: 'tipo',
        tipo: 'multi',
        opciones: [
          { valor: 'EXP', nombre: 'Expedientes' },
          { valor: 'ACRE', nombre: 'Oficina' },
        ]
      },
       */
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'En curso' },
          { valor: '3', nombre: 'Borrador' },
          { valor: '8', nombre: 'Anulado' },
          { valor: '9', nombre: 'Finalizado' }
        ]
      },
      { campo: 'emisorCentroCostoNumero', tipo: 'tipoDocumento' }, // tipo de documento
      // { campo: 'emisorSucursalDireccion', tipo: 'documento' }, // documento
      {
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        opciones: [
          { nombre: 'Documento privado', valor: '1' },
          { nombre: 'Documento público', valor: '0' }
        ]
      },
      { campo: 'compradorCodigo', tipo: 'tipoInstitucion' }, // tipo institucion
      // { campo: 'emisorContactoArea', tipo: 'institucion' }, // nombre institucion
      { campo: 'emisorContactoNombre', tipo: 'texto' }, // nombre remitente
      { campo: 'emisorContactoCargo', tipo: 'texto' }, // cargo remitente
      { campo: 'emisorContactoEmail', tipo: 'texto' }, // correo remitente
      {
        campo: 'transporteViaTransporteCodigoTransporte', // acompaña fisico
        tipo: 'multi',
        opciones: [
          { nombre: 'Acompaña físico', valor: '1' },
          { nombre: 'No acompaña físico', valor: '0' }
        ]
      },
      {
        campo: 'destinoCodigoIds', // tipos de destino
        tipo: 'multi',
        opciones: [
          { nombre: 'Funcionarios', valor: 'usuarios' },
          { nombre: 'Unidades', valor: 'unidades' },
          { nombre: 'Oficinas de partes', valor: 'oficinas' },
          { nombre: 'DocDigital', valor: 'docDigital' },
          { nombre: 'Ministerios', valor: 'ministerios' },
          { nombre: 'Empresas', valor: 'empresas' },
          { nombre: 'Personas', valor: 'personas' }
        ]
      },
      { campo: 'destinoUsuarios', tipo: 'destinoUsuarios' }, // tipo de destino usuarios
      { campo: 'destinoGrupos', tipo: 'destinoGrupos' }, // tipo de destino de grupo
      { campo: 'destinoCorreos', tipo: 'destinoCorreos' }, // tipo de destino de ministerio, persona o empresa
      {
        campo: 'referenciaTipo', // tipos de referencias
        tipo: 'multi',
        opciones: [
          { nombre: 'Expediente', valor: 'expediente' },
          { nombre: 'Contrato SAFI', valor: 'SAFI' },
          { nombre: 'Proceso SSD', valor: 'SSD' }
        ]
      },
      {
        campo: 'destinoCopiaIds', // tipos de referencias
        tipo: 'destinoCopiaIds'
      },
      { campo: 'solicitanteCorreo', tipo: 'solicitanteCorreo' }, // correo de usuario que creo el expediente
      { campo: 'codigosEtiqueta', tipo: 'texto' },
      { campo: 'textoObservaciones', tipo: 'texto' }
    ]
  },
  tramitados: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      { campo: 'tipo', tipo: 'multi', valor: ['EXP'] },
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'destinoResponsableIds', valor: '${idUsuario}' },
      { campo: 'claseMercadoPublico', tipo: 'multi', valor: ['int', 'ext', 'numInt', 'numOf'] }
    ],
    filtrosPorDefecto: [
      { campo: 'estado', tipo: 'multi', valor: ['8', '9'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      /*
      {
        campo: 'tipo',
        tipo: 'multi',
        opciones: [
          { valor: 'EXP', nombre: 'Expedientes' },
          { valor: 'ACRE', nombre: 'Oficina' },
        ]
      },
      */
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'En curso' },
          { valor: '3', nombre: 'Borrador' },
          { valor: '8', nombre: 'Anulado' },
          { valor: '9', nombre: 'Finalizado' }
        ]
      },
      { campo: 'emisorCentroCostoNumero', tipo: 'tipoDocumento' }, // tipo de documento
      // { campo: 'emisorSucursalDireccion', tipo: 'documento' }, // documento
      {
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        opciones: [
          { nombre: 'Documento privado', valor: '1' },
          { nombre: 'Documento público', valor: '0' }
        ]
      },
      { campo: 'compradorCodigo', tipo: 'tipoInstitucion' }, // tipo institucion
      // { campo: 'emisorContactoArea', tipo: 'institucion' }, // nombre institucion
      { campo: 'emisorContactoNombre', tipo: 'texto' }, // nombre remitente
      { campo: 'emisorContactoCargo', tipo: 'texto' }, // cargo remitente
      {
        campo: 'transporteViaTransporteCodigoTransporte', // acompaña fisico
        tipo: 'multi',
        opciones: [
          { nombre: 'Acompaña físico', valor: '1' },
          { nombre: 'No acompaña físico', valor: '0' }
        ]
      },
      {
        campo: 'destinoCodigoIds', // tipos de destino
        tipo: 'multi',
        opciones: [
          { nombre: 'Funcionarios', valor: 'usuarios' },
          { nombre: 'Unidades', valor: 'unidades' },
          { nombre: 'Oficinas de partes', valor: 'oficinas' },
          { nombre: 'DocDigital', valor: 'docDigital' },
          { nombre: 'Ministerios', valor: 'ministerios' },
          { nombre: 'Empresas', valor: 'empresas' },
          { nombre: 'Personas', valor: 'personas' }
        ]
      },
      { campo: 'destinoUsuarios', tipo: 'destinoUsuarios' }, // tipo de destino usuarios
      { campo: 'destinoGrupos', tipo: 'destinoGrupos' }, // tipo de destino de grupo
      { campo: 'destinoCorreos', tipo: 'destinoCorreos' }, // tipo de destino de ministerio, persona o empresa
      {
        campo: 'referenciaTipo', // tipos de referencias
        tipo: 'multi',
        opciones: [
          { nombre: 'Expediente', valor: 'expediente' },
          { nombre: 'Contrato SAFI', valor: 'SAFI' },
          { nombre: 'Proceso SSD', valor: 'SSD' }
        ]
      },
      { campo: 'solicitanteCorreo', tipo: 'solicitanteCorreo' }, // correo de usuario que creo el expediente
      { campo: 'codigosEtiqueta', tipo: 'texto' },
      { campo: 'textoObservaciones', tipo: 'texto' }
    ]
  }
};

export default {
  data() {
    return filterViews;
  },
  computed: {
    ...mapGetters('Usuario', { usuario: 'currentUser' }),
    ...mapGetters('Empresas', { empresa: 'company' }),
  },
  methods: {
    getFilterView(view) {
      return filterViews[view];
    }
  }
};
